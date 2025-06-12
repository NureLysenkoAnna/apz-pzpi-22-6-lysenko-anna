package com.example.gasleakapp.models

data class SensorCheck(
    val check_id: Int,
    val check_date: String,
    val result: String,
    val sensor_id: Int
)
