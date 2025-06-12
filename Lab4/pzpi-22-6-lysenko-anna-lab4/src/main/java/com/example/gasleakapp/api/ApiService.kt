package com.example.gasleakapp.api

import com.example.gasleakapp.models.AuthResponse
import com.example.gasleakapp.models.Location
import com.example.gasleakapp.models.LoginRequest
import com.example.gasleakapp.models.Sensor
import com.example.gasleakapp.models.SensorCheck
import com.example.gasleakapp.models.SensorData
import com.example.gasleakapp.models.User
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET
import retrofit2.http.Path

interface ApiService {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>

    @GET("users/{id}")
    suspend fun getUserById(@Path("id") id: Int): Response<User>

    @GET("locations/{id}")
    suspend fun getLocationById(@Path("id") id: Int): Response<Location>

    @GET("sensors/location/{locationId}")
    suspend fun getSensorsByLocation(@Path("locationId") locationId: Int): Response<List<Sensor>>

    @GET("checks/sensor/{sensorId}")
    suspend fun getSensorChecks(@Path("sensorId") sensorId: Int): Response<List<SensorCheck>>

    @GET("data")
    suspend fun getAllSensorData(): Response<List<SensorData>>
}
