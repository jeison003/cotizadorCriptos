import { ref , onMounted, computed} from "vue"

export default function useCripto(){

    const criptomonedas = ref([])
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
        { codigo: 'COP', texto: 'Peso Colombiano'}
    ])
    const cotizacion = ref({})
    const cargando = ref(false)
    onMounted(() =>{
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
        fetch(url)
          .then(respuesta => respuesta.json())
          .then(({Data}) => criptomonedas.value = Data)
      })

      const obtenerCotizacion = async (cotizar) =>{
        cargando.value = true
        // con esta asignacion ocultamos el mensaje "Cotizacion" para que solo aparezca cuando se muestra la info
        cotizacion.value = {}
        try {
          const {moneda, criptomoneda} = cotizar
          const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
          fetch(url)
            const respuesta = await fetch(url)
            const data = await respuesta.json()
            // Inyectamos dinamicamente las variables: data.DISPLAY[criptomoneda][moneda] = data.DISPLAY[BTC][Bitcoin]
            cotizacion.value = data.DISPLAY[criptomoneda][moneda]
        } catch (error) {
          console.log(error);
        }finally{
          cargando.value = false
        }
      }

      const mostrarResultado = computed(()=>{
        if(Object.values(cotizacion.value).length === 0){
            return false
          }
          return true
      } )

    return{
        monedas,
        criptomonedas,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }
}