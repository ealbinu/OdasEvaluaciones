Vue.component('finalize', {
    props: ['resultado', 'right', 'total'],
    data() {
        return {

        }
    },

    methods: {
        
    },
    mounted () {
        
    },
    template: `
        <div class="finalize">
            <div class="d-flex justify-content-center mt-5" v-if="!resultado">
                <button class="finalizar" @click="$emit('evaluate')">Finalizar</button>
            </div>

            <div class="d-flex justify-content-center mt-5 resultado" v-if="resultado">
                <h3>Resultado</h3>
                <div><strong>{{right}} correctas </strong> de {{total}} preguntas</div>
                <button class="finalizar" @click="$emit('reset')">Volver a intentar</button>
            </div>
        
        </div>
    `
})