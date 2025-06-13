package com.example.gasleakapp.ui

import android.content.Intent
import android.os.Bundle
import android.util.Base64
import android.util.Patterns
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.gasleakapp.R
import com.example.gasleakapp.api.ApiClient
import com.example.gasleakapp.models.LoginRequest
import kotlinx.coroutines.launch
import org.json.JSONObject

class LoginActivity : AppCompatActivity() {

    private fun getUserRoleFromJwt(token: String): String? {
        return try {
            val parts = token.split(".")
            val payload = String(Base64.decode(parts[1], Base64.DEFAULT))
            val json = JSONObject(payload)
            json.getString("role")
        } catch (e: Exception) {
            null
        }
    }

    private fun showError(message: String, tv: TextView) {
        tv.text = message
        tv.alpha = 0f
        tv.visibility = TextView.VISIBLE
        tv.animate().alpha(1f).setDuration(300).start()

        tv.postDelayed({
            tv.animate().alpha(0f).setDuration(300).withEndAction {
                tv.visibility = TextView.GONE
                tv.text = ""
            }.start()
        }, 3000)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val tvErrorMessage = findViewById<TextView>(R.id.tvErrorMessage)

        btnLogin.setOnClickListener {
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()

            tvErrorMessage.visibility = TextView.GONE
            tvErrorMessage.text = ""

            var hasError = false
            val errorBuilder = StringBuilder()

            if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                errorBuilder.append("Невірний формат email\n")
                hasError = true
            }

            if (password.length < 4) {
                errorBuilder.append("Пароль має містити щонайменше 4 символи")
                hasError = true
            }

            if (hasError) {
                showError(errorBuilder.toString().trim(), tvErrorMessage)
                return@setOnClickListener
            }

            lifecycleScope.launch {
                try {
                    val response = ApiClient.apiService.login(LoginRequest(email, password))
                    if (response.isSuccessful) {
                        val token = response.body()?.token ?: ""

                        val role = getUserRoleFromJwt(token)
                        if (role?.lowercase() != "resident") {
                            showError("Доступ дозволено лише мешканцям", tvErrorMessage)
                            return@launch
                        }

                        val sharedPref = getSharedPreferences("auth", MODE_PRIVATE)
                        sharedPref.edit().putString("token", token).apply()

                        val intent = Intent(this@LoginActivity, MainActivity::class.java)
                        startActivity(intent)
                        finish()
                    } else {
                        showError("Невірні облікові дані", tvErrorMessage)
                    }
                } catch (e: Exception) {
                    showError("Помилка мережі: ${e.message}", tvErrorMessage)
                }
            }
        }
    }
}
