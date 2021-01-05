import { Jobs } from '../services/endpoits';
import { dateToString, formatTrigger } from './format'

const replaceData = async () => {
  const response = await Jobs();
  
  for(const data of response.data) {
    /* Conversão da data enviada pela API */
    data.next_run_time = dateToString(data.next_run_time);
    data.last_run_time = dateToString(data.last_run_time);
    /* Formatação das informações do Cron */
    data.trigger = formatTrigger({
      trigger: data.trigger,
      minute: data.minute,
      hour: data.hour,
      day: data.day,
      month: data.month,
      day_of_week: data.day_of_week,
      group: data.group,
    })
  } return response.data;
}

export default replaceData