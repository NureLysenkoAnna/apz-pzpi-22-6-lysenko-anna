import android.graphics.Color
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.gasleakapp.R
import com.example.gasleakapp.models.SensorCheck
import com.example.gasleakapp.utils.DateUtils
import java.util.Locale

class SensorCheckAdapter : RecyclerView.Adapter<SensorCheckViewHolder>() {
    private val items = mutableListOf<SensorCheck>()

    fun setData(newItems: List<SensorCheck>) {
        items.clear()
        items.addAll(newItems)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: android.view.ViewGroup, viewType: Int):
            SensorCheckViewHolder {
        val view = android.view.LayoutInflater.from(parent.context)
            .inflate(R.layout.item_sensor_check, parent, false)
        return SensorCheckViewHolder(view)
    }

    override fun onBindViewHolder(holder: SensorCheckViewHolder, position: Int) {
        holder.bind(items[position])
    }

    override fun getItemCount(): Int = items.size
}

class SensorCheckViewHolder(view: android.view.View) : RecyclerView.ViewHolder(view) {
    private val tvCheckInfo: TextView = view.findViewById(R.id.tvCheckInfo)

    fun bind(item: SensorCheck) {
        val formattedDate = DateUtils.formatDateTime(item.check_date)
        tvCheckInfo.text = "$formattedDate — ${item.result}"
        tvCheckInfo.setTextColor(getColorForResult(item.result))
    }

    private fun getColorForResult(result: String): Int {
        return when (result.lowercase(Locale.getDefault())) {
            "успішно", "success" -> Color.parseColor("#2E7D32")
            "помилка", "failed", "error" -> Color.parseColor("#C62828")
            else -> Color.parseColor("#616161")
        }
    }
}