import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.gasleakapp.R
import com.example.gasleakapp.models.SensorData
import com.example.gasleakapp.utils.DateUtils

class SensorDataAdapter : RecyclerView.Adapter<SensorDataViewHolder>() {
    private val items = mutableListOf<SensorData>()

    fun setData(newItems: List<SensorData>) {
        items.clear()
        items.addAll(newItems)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: android.view.ViewGroup, viewType: Int):
            SensorDataViewHolder {
        val view = android.view.LayoutInflater.from(parent.context)
            .inflate(R.layout.item_sensor_data, parent, false)
        return SensorDataViewHolder(view)
    }

    override fun onBindViewHolder(holder: SensorDataViewHolder, position: Int) {
        holder.bind(items[position])
    }

    override fun getItemCount(): Int = items.size
}

class SensorDataViewHolder(view: android.view.View) : RecyclerView.ViewHolder(view) {
    private val tvDataInfo: TextView = view.findViewById(R.id.tvDataInfo)

    fun bind(item: SensorData) {
        val formattedTime = DateUtils.formatDateTime(item.time_stamp)
        tvDataInfo.text = "Газ: ${item.gas_level}, Темп: ${item.temperature}," +
                " Тиск: ${item.pressure} — $formattedTime"
    }
}