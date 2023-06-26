<script>
import {Line} from 'vue-chartjs'
import { mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
    extends: Line,
    props: ['chartData', "options"],
    mixins: [reactiveProp],
    watch: {
    chartData () {
      this.renderChart(this.chartData, this.options)
    }
  },
    mounted(){
        this.alldata()
    },
    methods: {
        alldata(){
            this.renderChart(this.chartData, this.options)
        }
    },
   

}

</script>