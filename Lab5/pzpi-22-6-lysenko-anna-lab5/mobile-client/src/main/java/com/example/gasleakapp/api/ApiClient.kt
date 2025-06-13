package com.example.gasleakapp.api

import android.content.Context
import com.example.gasleakapp.App
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiClient {
    private const val BASE_URL = "http://10.0.2.2:5199/api/"

    private val client = OkHttpClient.Builder()
        .addInterceptor { chain: Interceptor.Chain ->
            val prefs = App.context.getSharedPreferences("auth", Context.MODE_PRIVATE)
            val token = prefs.getString("token", null)

            val request: Request = chain.request().newBuilder().apply {
                token?.let {
                    addHeader("Authorization", "Bearer $it")
                }
            }.build()

            chain.proceed(request)
        }
        .build()

    private val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(client)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val apiService: ApiService = retrofit.create(ApiService::class.java)
}
