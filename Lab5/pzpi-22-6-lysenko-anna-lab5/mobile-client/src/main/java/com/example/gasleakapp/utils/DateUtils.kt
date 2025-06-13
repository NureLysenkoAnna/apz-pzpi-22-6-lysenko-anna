package com.example.gasleakapp.utils

import java.text.SimpleDateFormat
import java.util.*

object DateUtils {

    fun formatDateTime(original: String): String {
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
            val date = inputFormat.parse(original)
            val outputFormat = SimpleDateFormat("dd MMMM yyyy, HH:mm", Locale("uk"))
            outputFormat.format(date!!)
        } catch (e: Exception) {
            original
        }
    }

    fun formatInstallDate(dateStr: String): String {
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            val date = inputFormat.parse(dateStr)
            val outputFormat = SimpleDateFormat("dd MMMM yyyy", Locale("uk"))
            outputFormat.format(date!!)
        } catch (e: Exception) {
            dateStr
        }
    }
}
