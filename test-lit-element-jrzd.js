import { LitElement, html, css } from "lit";
import "@material/mwc-button/mwc-button";
import "@material/mwc-textfield/mwc-textfield";
import "@material/mwc-list/mwc-list";

class IntercambioLitElement extends LitElement{
	static get properties() {
	    return {
	      participante: { 
	      	nombre: {type:String},	      	
	      	regalos: {type : Array},
	      	idtxtRegalo : {type : String},	      	
	      },
	      regalo: {
	      		descripcion : {type:String},	      		
	      	},
	      participantes : {type:Array},
	      mensaje : {type:Array},
	      error : {type : Boolean}
	      	
	    };
	}

	constructor(){
		super();
		
        this.participante = new Object();
        this.participante.nombre = "";
        this.participante.regalos = [];
        this.participante.idtxtRegalo = "";

        this.regalo = new Object();
        this.regalo.descripcion = "";
        this.participantes = [];
        this.mensaje = [];
        this.error = false;

	}

	static get styles() {
	    return css`
	      #content {
	       margin: 3% 25% 0% 25%;
	       padding: 2em;
	       border-style: double;
	      }

	     
	      #participantes{
	       margin: 3% 5% 0% 5%;
	       padding: 2em;
	     
	      }
	      #error{
	      	color: coral;

	      }

	      
	    `;
    }

    agregarParticipante(e){
    	const nombre = this.shadowRoot.querySelector("#nombre");

    	if( nombre.value !== null && nombre.value !== "" ){
	    	this.participante.nombre = nombre.value;
	    	this.participante.idtxtRegalo = "txt"+nombre.value;

	    	const objParticipante = Object.assign({},this.participante);

	    	this.participantes = [...this.participantes, objParticipante]

	    	console.log(this.participantes);

	    	nombre.value = "";
	    	this.error = false;
	    	this.participante.nombre = "";



    	}else{
    		this.error = true;
    	}

    	this.requestUpdate();

    }
    agregarRegalo(e){

    	if(this.regalo.descripcion !== "" ){
	    	const regalo = this.shadowRoot.querySelector("#txt"+e.target.id);

	    	console.log(regalo,e.target.id);

	    	this.regalo.descripcion = regalo.value;

	    	const objRegalo = Object.assign({},this.regalo);

	    	let parti = this.participantes.filter( p => p.nombre === e.target.id )

	    	console.log(parti, parti[0].nombre);
	    	parti[0].regalos = [...parti[0].regalos,objRegalo]

	    	console.log(this.participantes);

	    	regalo.value="";
	    	this.regalo.descripcion = "";

	    	this.requestUpdate();
	    }

    }

    sortearParticipante(e){
    	this.mensaje = [];

    	if(this.participantes.length>=3){
    		this.participantes.map( (par, idx) => {
    			if(idx !== this.participantes.length -1){
    				this.mensaje = [...this.mensaje, `${par.nombre} le regala a  ${this.participantes[idx+1].nombre}`]
    			}else if (idx === this.participantes.length -1 ){
    				this.mensaje = [...this.mensaje,`${par.nombre} le regala a ${this.participantes[0].nombre}`]
    			}

    			
    		})

    	}
console.log(this.mensaje)
    	
    }

	render() {
    return html`
     <section id="content">
     	<section>
     	<p>
        	<span>Participante</span>
        </p>
        <mwc-textfield 
          id="nombre"
           @keyup="${(e) => (this.participante.nombre = e.target.value)}"
          .value=${this.participante.nombre}
          label="Nombre">
        </mwc-textfield>
        <mwc-button  @click="${this.agregarParticipante}" raised label="Agregar"></mwc-button>
		
		${this.participantes.length >= 3 ? html `
			<mwc-button  @click="${this.sortearParticipante}" raised label="Sortear"></mwc-button>
			`
			: html `<mwc-button  disabled label="Sortear"></mwc-button>`
		}

		${this.mensaje.length > 0 ? 
			this.mensaje.map( me => html `<p> ${me} </p>`)
			: null
		}
        
        ${this.error === true ? 
			html `<p><span id="error">Poner el nombre del participante</p> </p>`
			: null
		}
        
       
        </section>

        <section id="participantesList">
		 	${this.participantes.length === 0 ? html `<p>No hay participantes</p>`
		 		:html `
		 		<section id="participantes">  
		 		<ul>
		          ${this.participantes.map((par, idx) => html`
		          	<li>
			          	<span>${par.nombre}</span>
			          	<mwc-textfield 
					          id=${par.idtxtRegalo}
					           @keyup="${(e) => (this.regalo.descripcion = e.target.value)}"
					          .value=${this.regalo.descripcion}
					          label="Regalo">
					    </mwc-textfield>
			          	<mwc-button  
			          	id="${par.nombre}"
			          	@click="${this.agregarRegalo}" 
			          	raised label="+">
			          	</mwc-button>
			          	<mwc-button  
			          	id="${par.nombre}"
			          	@click="${this.eliminarPersona}" 
			          	raised label="x">
			          	</mwc-button>
			          	<section id="regalos">
			          		<mwc-list >
					          ${par.regalos.map((ta) => html`<mwc-list-item>${ta.descripcion}
						          	<mwc-button
						          	id = "${ta.descripcion}"
						          	@click="${this.deleRegalo}">
									  x
									</mwc-button>
					          	</mwc-list-item>`)}
							</mwc-list>
			          	</section>

		          	</li>`)}
				</ul>
		 		</section>
		 		`}
		 </section>

	 </section>

	 
    `;
  }
}

customElements.define("test-lit-element-jrzd", IntercambioLitElement);