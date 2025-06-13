package com.example.gasleakapp.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.gasleakapp.R
import com.example.gasleakapp.adapters.SensorAdapter
import com.example.gasleakapp.api.ApiClient
import com.example.gasleakapp.utils.JwtUtils
import com.example.gasleakapp.utils.DateUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private lateinit var tvGreeting: TextView
    private lateinit var tvLocation: TextView
    private lateinit var rvSensors: RecyclerView
    private lateinit var btnLogout: Button

    private var token: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tvGreeting = findViewById(R.id.tvGreeting)
        tvLocation = findViewById(R.id.tvLocation)
        rvSensors = findViewById(R.id.rvSensors)
        btnLogout = findViewById(R.id.btnLogout)

        rvSensors.layoutManager = LinearLayoutManager(this)

        token = getSharedPreferences("auth", MODE_PRIVATE).getString("token", null)
        if (token == null) {
            Toast.makeText(this, "Сесія не дійсна", Toast.LENGTH_SHORT).show()
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
            return
        }

        val payload = JwtUtils.decodePayload(token!!)

        val userId = payload?.optString("sub")?.toIntOrNull()
        val locationId = payload?.optString("location_id")?.toIntOrNull()

        if (userId == null || locationId == null) {
            Toast.makeText(this, "Помилка авторизації", Toast.LENGTH_SHORT).show()
            return
        }

        loadUser(userId)
        loadLocation(locationId)
        loadSensors(locationId)

        btnLogout.setOnClickListener {
            getSharedPreferences("auth", MODE_PRIVATE).edit().remove("token").apply()
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun loadUser(userId: Int) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = ApiClient.apiService.getUserById(userId)
                val user = response.body()
                if (user != null) {
                    tvGreeting.text = "Вітаємо, ${user.user_name}!"
                } else {
                    tvGreeting.text = "Вітаємо!"
                }
            } catch (e: Exception) {
                tvGreeting.text = "Вітаємо!"
            }
        }
    }

    private fun loadLocation(locationId: Int) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = ApiClient.apiService.getLocationById(locationId)
                if (response.isSuccessful) {
                    val location = response.body()
                    tvLocation.text = "Локація: ${location?.name}"
                }
            } catch (e: Exception) {
                tvLocation.text = "Локація: невідома"
            }
        }
    }

    private fun loadSensors(locationId: Int) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = ApiClient.apiService.getSensorsByLocation(locationId)
                val sensors = response.body()
                if (response.isSuccessful && sensors != null) {
                    rvSensors.adapter = SensorAdapter(sensors) { sensor ->
                        val intent = Intent(this@MainActivity,
                            SensorDetailActivity::class.java).apply {
                            putExtra("sensorId", sensor.sensor_id)
                            putExtra("sensorType", sensor.type)
                            putExtra("sensorStatus", sensor.status)
                            putExtra("sensorDate",
                                DateUtils.formatInstallDate(sensor.installation_date))
                        }
                        startActivity(intent)
                    }
                } else {
                    Toast.makeText(this@MainActivity, "Сенсори не знайдено",
                        Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Toast.makeText(this@MainActivity, "Помилка при завантаженні сенсорів",
                    Toast.LENGTH_SHORT).show()
            }
        }
    }
}