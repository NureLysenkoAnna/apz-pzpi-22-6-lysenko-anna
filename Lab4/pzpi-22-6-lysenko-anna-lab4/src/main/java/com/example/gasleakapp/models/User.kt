package com.example.gasleakapp.models

data class User(
    val user_id: Int,
    val user_name: String,
    val email: String,
    val role: String,
    val location_id: Int
)
