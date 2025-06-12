package com.example.gasleakapp.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.gasleakapp.R
import com.example.gasleakapp.models.Sensor
import com.example.gasleakapp.utils.DateUtils

class SensorAdapter(
    private val sensors: List<Sensor>,
    private val onClick: (Sensor) -> Unit
) : RecyclerView.Adapter<SensorAdapter.SensorViewHolder>() {

    class SensorViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvName: TextView = itemView.findViewById(R.id.tvSensorType)
        val tvStatus: TextView = itemView.findViewById(R.id.tvSensorStatus)
        val tvDate: TextView = itemView.findViewById(R.id.tvSensorDate)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SensorViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_sensor, parent, false)
        return SensorViewHolder(view)
    }

    override fun onBindViewHolder(holder: SensorViewHolder, position: Int) {
        val sensor = sensors[position]
        holder.tvName.text = sensor.type
        holder.tvStatus.text = "Статус: ${sensor.status}"
        holder.tvDate.text = "Встановлено: ${DateUtils.formatInstallDate(sensor.installation_date)}"

        holder.itemView.setOnClickListener {
            onClick(sensor)
        }
    }

    override fun getItemCount(): Int = sensors.size
}
