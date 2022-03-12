import {Component, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {map, Observable, Subscription, tap} from "rxjs";
import {Evento} from "../../models/evento";
import {Visita} from "../../models/visita";
import {Animale} from "../../models/animale";
import {HotToastService} from "@ngneat/hot-toast";

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
  eventi!: Observable<Visita[]>;

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
    this.eventi = this.trasformArrayVisite(visite);
  }

  trasformArrayVisite(obsVisite: Observable<VisitaDTO[]>): Observable<Visita[]> {
    //aggiungo alle visite le informazioni sugli animali
    this.eventi = obsVisite.pipe(
      tap(visite => console.log("Visite ricevute: " + visite.length)),
      map(visite => visite.filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))),
      tap(visite => console.log("Visite filtrate: " + visite.length)),
      //trasforma da tipo VisitaDTO[] a Visita[]
      map(visite => {
        return visite
          .filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))
          .map((visita:VisitaDTO) => {
            let animale: Animale = this.serviceAnimali.getAnimale(visita.idAnimale) as Animale;
            return new Visita(visita.tipoVisita, new Date(visita.data), visita.durataInMinuti, visita.note, visita.id, animale);
          });
      }),
      tap(visite => console.log("Visite trasformate da VisitaDTO[] a Visita[]: " + visite.length)),
      tap(visite => visite.forEach(visita => {
        console.log("Visite: ");
        console.log(visita.data.getTime());
      })),
      //ordino le visite per data in ordine decrescente
      map(visite => {
        visite.sort((a:Visita, b:Visita) => (b.data.getTime() - a.data.getTime()));
        return visite;
      }),
      tap(visite => {
        console.log("Visite ordinate:");
        visite.forEach(visita => console.log(visita));
      }),
    );
    return this.eventi;
  }

  //preme il pulsante di filtro della lista di eventi
  onSubmitFilterForm() {
    let visite_dto = this.gestoreEventiService.getVisite(this.filterForm.get("idAnimale")!.value, this.filterForm.get("tipoVisita")!.value);
    this.eventi = this.trasformArrayVisite(visite_dto);
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterForm.get("tipoEvento")!.value != "visita") {
      this.filterForm.setControl("tipoVisita", new FormControl(""));
    }
  }

  handleVisitaEliminata(visita: Visita) {
    console.log("Sto eliminando la visita");
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
        console.log("Visita eliminata con successo");
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
}
