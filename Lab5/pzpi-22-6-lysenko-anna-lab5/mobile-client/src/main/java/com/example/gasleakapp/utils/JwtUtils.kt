package com.example.gasleakapp.utils

import android.util.Base64
import org.json.JSONObject

object JwtUtils {

    fun decodePayload(token: String): JSONObject? {
        return try {
            val parts = token.split(".")
            if (parts.size < 2) return null

            val decodedBytes = Base64.decode(parts[1], Base64.URL_SAFE
                    or Base64.NO_PADDING or Base64.NO_WRAP)
            val json = String(decodedBytes, Charsets.UTF_8)
            JSONObject(json)
        } catch (e: Exception) {
            null
        }
    }
}
