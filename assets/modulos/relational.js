var epDrag = {
    isSource:true, isTarget:false,
    connector: ["Bezier", {curviness: 100}],
    paintStyle: { stroke:'#70BF44', strokeWidth:6, fill: '#fff' },
    connectorPaintStyle:{ stroke:'#70BF44', strokeWidth:6, fill: '#fff' },
}
var epTarget = {
    isSource:false, isTarget:true,
    paintStyle: { stroke:'#fff', strokeWidth:6, fill: '#70BF44' },
    maxConnections: -1
} 

Vue.component('relational', {
    props: ['value', 'sources', 'targets', 'connections'],
    data() {
        return {
            status: '',
            evaluate: false,
            result: false,
            started: false
        }
    },
    computed:{
        
    },
    watch: {
        value () {
            if(this.watch){
                this.status = this.value
            }
        }
    },
    methods: {
        startConnections () {
            this.started = true
            for (item in this.sources) {
                jsPlumb.addEndpoint('s_'+item, { anchor:"Right", uuid: 's_'+item }, epDrag )
            }
            for (item in this.targets) {
                jsPlumb.addEndpoint('t_'+item, { anchor:"Left", uuid: 't_'+item }, epTarget )
            }
            for (item in this.connections) {
                jsPlumb.connect({ uuids:connections[item] })
            }
        }
    },
    mounted () {
        //this.$emit('input', false)
        var _this = this
        setTimeout(function (){
            //_this.startConnections()
        }, 1000)
    },
    
    template: `
        <div class="relational row justify-content-between">
            <div class="relationalStart" @click="startConnections()" v-if="!started">
                <img src="../../assets/aimg/relational.svg">
            </div>
            <div class="sources col-4">
                <div v-for="(source, index) in sources" :id="'s_'+index" :data="source.data">
                    <slot name="source" :source="source" />
                </div>
            </div>
            <div class="targets col-4">
                <div v-for="(target, index) in targets" :id="'t_'+index"  :data="target.data">
                    <slot name="target" :target="target" />
                </div>
            </div>
        </div>
    `
})