package com.example.gasleakapp.ui

import SensorCheckAdapter
import SensorDataAdapter
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.gasleakapp.R
import com.example.gasleakapp.api.ApiClient
import com.example.gasleakapp.utils.DateUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SensorDetailActivity : AppCompatActivity() {

    private lateinit var tvSensorInfo: TextView
    private lateinit var rvSensorChecks: RecyclerView
    private lateinit var rvSensorData: RecyclerView
    private lateinit var tvNoChecks: TextView
    private lateinit var tvNoData: TextView

    private lateinit var sensorCheckAdapter: SensorCheckAdapter
    private lateinit var sensorDataAdapter: SensorDataAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sensor_detail)

        val sensorId = intent.getIntExtra("sensorId", -1)
        val sensorType = intent.getStringExtra("sensorType") ?: ""
        val sensorStatus = intent.getStringExtra("sensorStatus") ?: ""
        val sensorDate = intent.getStringExtra("sensorDate") ?: ""

        tvSensorInfo = findViewById(R.id.tvSensorInfo)
        rvSensorChecks = findViewById(R.id.rvSensorChecks)
        rvSensorData = findViewById(R.id.rvSensorData)
        tvNoChecks = findViewById(R.id.tvNoChecks)
        tvNoData = findViewById(R.id.tvNoData)

        tvSensorInfo.text = "Тип: $sensorType\nСтатус: $sensorStatus\n" +
                "Встановлено: ${DateUtils.formatInstallDate(sensorDate)}"

        sensorCheckAdapter = SensorCheckAdapter()
        sensorDataAdapter = SensorDataAdapter()

        rvSensorChecks.layoutManager = LinearLayoutManager(this)
        rvSensorChecks.adapter = sensorCheckAdapter

        rvSensorData.layoutManager = LinearLayoutManager(this)
        rvSensorData.adapter = sensorDataAdapter

        loadSensorChecks(sensorId)
        loadSensorData(sensorId)
    }

    private fun loadSensorChecks(sensorId: Int) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = ApiClient.apiService.getSensorChecks(sensorId)
                val checks = response.body()
                if (response.isSuccessful) {
                    val list = checks ?: emptyList()
                    sensorCheckAdapter.setData(list)
                    tvNoChecks.visibility = if (list.isEmpty()) TextView.VISIBLE else TextView.GONE
                } else {
                    tvNoChecks.visibility = TextView.VISIBLE
                }
            } catch (e: Exception) {
                tvNoChecks.visibility = TextView.VISIBLE
            }
        }
    }

    private fun loadSensorData(sensorId: Int) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = ApiClient.apiService.getAllSensorData()
                val allData = response.body()
                val filtered = allData?.filter { it.sensor_id == sensorId } ?: emptyList()

                if (response.isSuccessful) {
                    val list = filtered
                    sensorDataAdapter.setData(list)
                    tvNoData.visibility = if (list.isEmpty()) TextView.VISIBLE else TextView.GONE
                } else {
                    tvNoData.visibility = TextView.VISIBLE
                }
            } catch (e: Exception) {
                tvNoData.visibility = TextView.VISIBLE
            }
        }

        val btnBack = findViewById<Button>(R.id.btnBack)
        btnBack.setOnClickListener {
            finish()
        }
    }
}