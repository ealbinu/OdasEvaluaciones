Vue.component('finalize', {
    props: ['resultado', 'right', 'total'],
    data() {
        return {
            areyousure: false
        }
    },

    methods: {
        
    },
    mounted () {
        
    },
    template: `
        <div class="finalize">
            <div class="d-flex justify-content-center mt-5 flex-column text-center" v-if="!resultado">
                <button class="finalizar" @click="areyousure = true" v-if="!areyousure">Finalizar evaluación</button>
                <template v-if="areyousure">
                    <p class="yessure">¿Deseas concluír con la evaluación?. Tus resultados se guardarán y ya no podrás cambiar las respuestas.</p>
                    <button class="finalizar sure" @click="$emit('evaluate')">Concluír evaluación</button>
                </template>
            </div>

            <div class="d-flex justify-content-center mt-5 resultado" v-if="resultado">
                <h3>Resultado</h3>
                <div><strong>{{right}} correctas </strong> de {{total}} preguntas</div>
                <!--<button class="finalizar" @click="$emit('reset')">Volver a intentar</button>-->
            </div>

        </div>
    `
})