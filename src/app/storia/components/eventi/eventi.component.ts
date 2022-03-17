import {Component, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GestoreAnimaliService} from "../../../ospedale/services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../../ospedale/services/gestore-eventi/gestore-eventi.service";
import {map, Observable, of, Subscription, tap} from "rxjs";
import {Evento} from "../../../ospedale/models/evento";
import {Visita} from "../../../ospedale/models/visita";
import {Animale} from "../../../ospedale/models/animale";
import {HotToastService} from "@ngneat/hot-toast";
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {GestoreVisiteService} from "../../../ospedale/services/gestore-visite/gestore-visite.service";

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
    private gestoreVisiteService: GestoreVisiteService,
    private serviceAnimali: GestoreAnimaliService,
    private toast: HotToastService
) {
  }

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimali();
    // this.animali.subscribe((animali) => {
    //   if (animali.length > 0) {
    //     let formControlIdAnimale = this.filterForm.get("idAnimale");
    //     formControlIdAnimale!.setValue(animali[0].id);
    //     console.log(formControlIdAnimale!.value);
    //     if (formControlIdAnimale)
    //       this.eventi = this.gestoreEventiService.getEventi(formControlIdAnimale.value);
    //     else this.eventi = of([]);
    //   } else {
    //     this.eventi = of([]);
    //   }
    // });
    this.eventi = this.gestoreEventiService.getEventi();
  }

  //preme il pulsante di filtro della lista di eventi
  onSubmitFilterForm() {
    // let visite_dto = this.gestoreEventiService.getVisite(this.filterForm.get("idAnimale")!.value, this.filterForm.get("tipoVisita")!.value);
    // let visiteTrasformate = this.gestoreV.tra(visite_dto);
    // this.eventi = this.addEventoPersonalizzato(visiteTrasformate);
  }

  //mockup
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
    let res = this.gestoreVisiteService.deleteVisita(visita);
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
          map((eventi) => eventi.filter((evento_) => evento_.id !== visita.id))
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
