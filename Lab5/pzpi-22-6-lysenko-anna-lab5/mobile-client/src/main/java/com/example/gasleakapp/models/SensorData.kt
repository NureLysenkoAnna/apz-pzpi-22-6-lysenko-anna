package com.example.gasleakapp.models

data class SensorData(
    val data_id: Int,
    val gas_level: Double,
    val temperature: Double,
    val pressure: Double,
    val time_stamp: String,
    val sensor_id: Int
)
