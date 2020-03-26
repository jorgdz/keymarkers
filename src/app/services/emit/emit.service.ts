import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EmitService {

	// Observando cambios de origen
    private emitChangeSource = new Subject<any>();

    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    
    // Emitiendo respuesta al componente destino
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

}