import {Component, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {map, Observable, Subscription, tap} from "rxjs";
import {Evento} from "../../models/evento";
import {Visita} from "../../models/visita";
import {Animale} from "../../models/animale";
import {HotToastService} from "@ngneat/hot-toast";
import {EventoPersonalizzato} from "../../models/evento-personalizzato";

type VisitaDTO = { tipoVisita: string, data: string, durataInMinuti: number, note: string, id: number, idAnimale: number };

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit, OnDestroy, OnChanges {
  filterForm = this.formBuilder.group({
    "idAnimale":0,
    "tipoEvento":"",
    "tipoVisita":"",
  });
  animali!: Observable<Animale[]>;
  eventi!: Observable<Evento[]>;

  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private gestoreEventiService: GestoreEventiService,
    private serviceAnimali: GestoreAnimaliService,
    private toast: HotToastService
) {
  }

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimali();
    let visite = this.gestoreEventiService.getVisite();
    let visiteTrasformate = this.trasformArrayVisite(visite);
    this.eventi = this.addEventoPersonalizzato(visiteTrasformate);
  }

  trasformArrayVisite(obsVisite: Observable<VisitaDTO[]>): Observable<Visita[]> {
    //aggiungo alle visite le informazioni sugli animali
    let visiteTrasformate = obsVisite.pipe(
      // tap(visite => console.log("Visite ricevute: " + visite.length)),
      map(visite => visite.filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))),
      // tap(visite => console.log("Visite filtrate: " + visite.length)),
      //trasforma da tipo VisitaDTO[] a Visita[]
      map(visite => {
        return visite
          .filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))
          .map((visita:VisitaDTO) => {
            let animale: Animale = this.serviceAnimali.getAnimale(visita.idAnimale) as Animale;
            return new Visita(visita.tipoVisita, new Date(visita.data), visita.durataInMinuti, visita.note, visita.id, animale);
          });
      }),
      // tap(visite => console.log("Visite trasformate da VisitaDTO[] a Visita[]: " + visite.length)),
      // tap(visite => visite.forEach(visita => {
      //   console.log("Visite: ");
      //   console.log(visita.data.getTime());
      // })),
      //ordino le visite per data in ordine decrescente
      map(visite => {
        visite.sort((a:Visita, b:Visita) => (b.data.getTime() - a.data.getTime()));
        return visite;
      }),
      // tap(visite => {
      //   console.log("Visite ordinate:");
      //   visite.forEach(visita => console.log(visita));
      // }),
    );
    return visiteTrasformate;
  }

  //preme il pulsante di filtro della lista di eventi
  onSubmitFilterForm() {
    let visite_dto = this.gestoreEventiService.getVisite(this.filterForm.get("idAnimale")!.value, this.filterForm.get("tipoVisita")!.value);
    let visiteTrasformate = this.trasformArrayVisite(visite_dto);
    this.eventi = this.addEventoPersonalizzato(visiteTrasformate);
  }

  private addEventoPersonalizzato(visiteTrasformate: Observable<Visita[]>) {
    return visiteTrasformate.pipe(
      tap(visite => console.log("Visite trasformate: " + visite.length)),
      map(visite => {
        let eventi: Evento[] = [];
        eventi.push(...visite);
        return eventi;
      }),
      tap(eventi => {
        console.log("Visite: ");
        eventi.forEach(evento => console.log(evento));
      }),
      tap((eventi: Evento[]) => console.log("Tipo Visita: ",(eventi[0]) instanceof  Visita)),
      map((eventi: Evento[]) => {
        let eventoPers = new EventoPersonalizzato();
        eventoPers.id = 10;
        eventoPers.testo = "LEo ha fatto una corsa";
        eventoPers.data = new Date(Date.now());
        eventi.push(eventoPers);
        return eventi;
      }),
      tap(eventi => {
        console.log("Eventi: ");
        eventi.forEach(evento => console.log(evento));
      }),
      tap(eventi => console.log("Tipo EventoPersonalizzato", ((eventi[eventi.length-1]) instanceof EventoPersonalizzato))),
      map((eventi: Evento[]) => eventi.sort((a:Evento, b:Evento) => ((b.data ? b.data.getTime() : 0) - (a.data ? a.data.getTime() : 0)))),
      tap(eventi => {
        console.log("Eventi sorted: ");
        eventi.forEach(evento => console.log(evento));
      }),
    );
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterForm.get("tipoEvento")!.value != "visita") {
      this.filterForm.setControl("tipoVisita", new FormControl(""));
    }
  }

  handleVisitaEliminata(visita: Visita) {
    // console.log("Sto eliminando la visita");
    //elimino persistente
    let res = this.gestoreEventiService.deleteVisita(visita);
    res.pipe(
      this.toast.observe({
         loading: 'Sto eliminando la visita...',
         success: 'Visita eliminata con successo!',
         error: 'Qualcosa è andato storto!'
      })
    ).subscribe({
      next: (_: any) => {
        // console.log("Visita eliminata con successo");
        this.eventi = this.eventi.pipe(
          map((visite) => visite.filter((visita_) => visita_.id !== visita.id))
        );
      },
      error: (error: any) => {
        console.log("Errore nell'eliminazione della visita");
        console.log(error);
      }
    });
  }
  isEventoPersonalizzato(val: Evento): boolean {return val instanceof EventoPersonalizzato}
  isVisita(val: Evento):boolean {return val instanceof Visita}

  castToEventoPersonalizzato(evento: Evento): EventoPersonalizzato {
    return evento as EventoPersonalizzato;
  }

  castToVisita(evento: Evento): Visita {
    return evento as Visita;
  }

}
