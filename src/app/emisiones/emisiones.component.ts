import { Component, OnInit } from '@angular/core';
import { DataStore, Hub, Predicates  } from 'aws-amplify';
import { Emision, Establishment, User } from 'src/models'; // La ruta puede variar según donde se generó tu modelo.
import { Factor } from 'src/models'; // La ruta puede variar según donde se generó tu modelo.
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { DataService } from '../services/data.service';
import { ElementRef, ViewChild } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';

function excelDateToJSDate(serial: number): Date {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);

  const fractionalDay = serial - Math.floor(serial) + 0.0000001;

  let totalSeconds = Math.floor(86400 * fractionalDay);
  const seconds = totalSeconds % 60;
  totalSeconds -= seconds;

  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor(totalSeconds / 60) % 60;

  return new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate(), hours, minutes, seconds);
}
@Component({
  selector: 'app-emisiones',
  templateUrl: './emisiones.component.html',
  styleUrls: ['./emisiones.component.css'],
})

export class EmisionesComponent implements OnInit {
  emisionesDesdeExcel: any[] = [];
  selection = new SelectionModel<Emision>(true, []);
  factores: any[] = [];
  emisiones: Emision[] = [];
  establecimiento: Establishment [] = []
  nombreArchivo: string = 'Seleccionar archivo';  // Añade esta línea
  displayedColumns: string[] = [
    'select',
    'ALCANCE',
    'ESTABLECIMIENTO',
    'CATEGORIA',
    'SUBCATEGORIA',
    'ACTIVIDAD',
    'COMBUSTIBLE',
    'UNIDADFE',
    'CANTIDAD',
    'CO2',
    'CH4',
    'N2O',
    'SF6',
    'HFC',
    'PFC',
    'NF3',
    'InicioPeriodo',
    'TerminoPeriodo',
    'INCERTIDUMBRE',
    'ORIGENFE',
  ];
  alcances: string[] = [];
  categorias: string[] = [];
  concatenados: string[] = [];
  unidades: string[] = [];
  selectedEstablecimiento: any = null;
  emitionBtn: any = null;

  public form: FormGroup = new FormGroup({
    ALCANCE: new FormControl('', Validators.required),
    CATEGORIA: new FormControl({ value: '', disabled: true }, Validators.required),
    CONCATENADO: new FormControl({ value: '', disabled: true }, Validators.required),
    UNIDADFE: new FormControl({ value: '', disabled: true }, Validators.required),
    CANTIDAD: new FormControl('', Validators.required),
    InicioPeriodo: new FormControl('', Validators.required),
    TerminoPeriodo: new FormControl('', Validators.required),
    ESTABLECIMIENTO: new FormControl('', Validators.required),

  });
  public mostrandoFormulario = false;

  public formEstablecimiento: FormGroup = new FormGroup({
    ESTABLECIMIENTO: new FormControl('', Validators.required),
  });


  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dataStoreService: DataStoreService,
    private dataService: DataService  // Inyecta DataService

  ) { }
  companyID: string = '';
  userID: string | null = 'null';
  establishmentID: string = 'null';
  establecimientos: Establishment[] = [];



  handleFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      console.error('No se puede usar múltiples archivos');
      return;
    }


    if (target.files.length !== 1) {
      console.error('No se puede usar múltiples archivos');
      return;
    }

       // Actualiza el nombre del archivo
       this.nombreArchivo = target.files[0].name;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.emisionesDesdeExcel = XLSX.utils.sheet_to_json(ws);
      console.log("Datos cargados desde Excel:", this.emisionesDesdeExcel);

    };

    reader.readAsBinaryString(target.files[0]);
  }
  factoresDesdeExcel: any[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;

  async procesarEmisiones() {
    if (this.emisionesDesdeExcel.length === 0) {
      // Muestra una notificación al usuario
      this.snackBar.open('No hay datos para procesar. Por favor, selecciona un archivo primero.', 'Cerrar', { duration: 4000 });
      return;
    }

    const errores: any[] = [];
    const exitosos: any[] = [];

    for (const emisionData of this.emisionesDesdeExcel) {
      const form = this.crearFormularioConDatos(emisionData);
      console.log("Formulario creado con datos:", form.value);


      if (form.valid) {
        try {
          await this.agregarEmisionDesdeFormulario(form);
          exitosos.push(emisionData);
        } catch (e: any) {
          errores.push({ data: emisionData, error: e.message });
        }
      } else {
        errores.push({ data: emisionData, error: 'Datos no válidos en el formulario.' });
      }
    }

    // Notifica al usuario sobre los resultados
    this.snackBar.open(`${exitosos.length} emisiones agregadas con éxito. ${errores.length} emisiones tuvieron errores.`, 'Cerrar', { duration: 4000 });

    this.fileInput.nativeElement.value = '';  // Resetea el control del archivo
    this.nombreArchivo = 'Seleccionar archivo';
    this.emisionesDesdeExcel = [];
  }

  crearFormularioConDatos(data: any): FormGroup {
    return new FormGroup({
      ALCANCE: new FormControl(data.ALCANCE, Validators.required),
      CATEGORIA: new FormControl(data.CATEGORIA, Validators.required),
      SUBCATEGORIA: new FormControl(data.SUBCATEGORIA, Validators.required),
      ACTIVIDAD: new FormControl(data.ACTIVIDAD, Validators.required),
      COMBUSTIBLE: new FormControl(data.COMBUSTIBLE, Validators.required),
      UNIDADFE: new FormControl(data.UNIDADFE, Validators.required),
      CANTIDAD: new FormControl(data.CANTIDAD, Validators.required),
      InicioPeriodo: new FormControl(data.InicioPeriodo, Validators.required),
      TerminoPeriodo: new FormControl(data.TerminoPeriodo, Validators.required),
    });
  }


  async agregarEmisionDesdeFormulario(form: FormGroup) {
    const nickname = 'holamundo'
    if (form.valid) {
      const values = form.value;
      const jsInicioPeriodo = excelDateToJSDate(values.InicioPeriodo);
      const jsTerminoPeriodo = excelDateToJSDate(values.TerminoPeriodo);
      const CONCATENADO = `${values.SUBCATEGORIA} - ${values.ACTIVIDAD} - ${values.COMBUSTIBLE}`;

      const factoresRelevantes = this.factores.filter(
        (factor) => factor.CONCATENADO === CONCATENADO
      );
      const INCERTIDUMBRE = factoresRelevantes[0]?.INCERTIDUMBRE || '';
      const ORIGENFE = factoresRelevantes[0]?.ORIGENFE || '';

      const cantidad = parseFloat(values.CANTIDAD);

      const formatDateToAWSDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      // Descomponer el valor de CONCATENADO en sus tres partes
      // Inicializar valores de gases
      let CO2 = 0,
        CH4 = 0,
        N2O = 0,
        SF6 = 0,
        HFC = 0,
        PFC = 0,
        NF3 = 0;

      // Calcular emisiones basadas en factores relevantes
      factoresRelevantes.forEach((factor) => {
        const emision = factor.VALORFE * cantidad;
        switch (factor.CONTAMINANTE) {
          case 'Dióxido de Carbono (CO2)':
            CO2 += emision;
            break;
          case 'Metano (CH4)':
            CH4 += emision;
            break;
          case 'Óxido Nitroso (N2O)':
            N2O += emision;
            break;
          case 'Hexafluoruro de azufre (SF6)':
            SF6 += emision;
            break;
          case 'Hidrofluorocarbono (HFC)':
            HFC += emision;
            break;
          case 'Perfluorocarbono (PFC)':
            PFC += emision;
            break;
          case 'Trifluoruro de nitrógeno (NF3)':
            NF3 += emision;
            break;
          default:
            console.error(`Contaminante no reconocido: ${factor.CONTAMINANTE}`);
        }
        // console.log("Factores relevantes:", factoresRelevantes);
        // console.log("Objeto emision a guardar:", emision);
      });

   // Crear un objeto Emision basado en los valores del formulario
      const emision = new Emision({
        Company: nickname, // Debes decidir de dónde obtener este valor
        ALCANCE: values.ALCANCE,
        CATEGORIA: values.CATEGORIA,
        SUBCATEGORIA: values.SUBCATEGORIA,
        ACTIVIDAD: values.ACTIVIDAD,
        COMBUSTIBLE: values.COMBUSTIBLE,
        UNIDADFE: values.UNIDADFE,
        CANTIDAD: cantidad,
        CO2: CO2,
        CH4: CH4,
        N2O: N2O,
        SF6: SF6,
        HFC: HFC,
        PFC: PFC,
        NF3: NF3,
        InicioPeriodo: formatDateToAWSDate(jsInicioPeriodo),
        TerminoPeriodo: formatDateToAWSDate(jsTerminoPeriodo),
        INCERTIDUMBRE: INCERTIDUMBRE,
        ORIGENFE: ORIGENFE,
        userID: this.userID!,
        companyID: this.companyID!, // Asegúrate de que este valor esté disponible
        EstablishmentID: this.establishmentID
      });


      try {
        await DataStore.save(emision);
        Hub.dispatch('emisiones', {
          event: 'nuevaEmision',
          data: emision
        });
      } catch (error) {
        console.error('Detalle del error:', error);

        throw new Error('Error al guardar en DataStore.');
      }
    } else {
      throw new Error('Datos no válidos en el formulario.');
    }
    await this.cargarEmisiones();
  }

  async cargarEmisiones(): Promise<void> {
    this.emisiones = await DataStore.query(Emision);

  }

  obtenerNombreEstablecimiento(id: string): string {
    const establecimiento = this.establecimientos.find(est => est.id === id);
    return establecimiento ? establecimiento.name : 'Nombre no encontrado';
  }

  async cargarEstablecimiento(): Promise<void> {
    this.establecimiento = await DataStore.query(Establishment);
  }
  async ngOnInit(): Promise<void> {
    try {
      const data = await this.dataService.getUserAndCompany();
      if (data && data.company && data.user) {
        this.companyID = data.user.companyID;
        this.userID = data.user.id;
        this.establecimientos = await DataStore.query(Establishment, est => est.companyID.eq(this.companyID));
      } else {
        console.error('No se pudo obtener el usuario o la compañía');
      }

      // console.log(this.establecimientos)

      // Espera a que ambas fuentes de datos estén listas
      const [
        emisionesDesdeDataStore,
        factoresDesdeDataStore,
        factoresDesdeJson,
      ] = await Promise.all([
        DataStore.query(Emision),
        DataStore.query(Factor),
        this.http.get<any>('/assets/factores.json').toPromise(),
      ]);

      await this.cargarEmisiones();

      this.factores = [
        ...factoresDesdeDataStore,
        ...factoresDesdeJson.factores,
      ];
      // Ahora que tienes todos los factores, puedes procesarlos para obtener los alcances, categorías, etc.
      this.alcances = [
        ...new Set(this.factores.map((factor) => factor.ALCANCE)),
      ];
      // console.log(this.alcances);

      this.form.get('ALCANCE')?.valueChanges.subscribe((selectedAlcance) => {
        this.form.patchValue({
          CATEGORIA: '',
          CONCATENADO: '',
          UNIDADFE: '',
          CANTIDAD: '',
        });

        this.categorias = [
          ...new Set(
            this.factores
              .filter((factor) => factor.ALCANCE === selectedAlcance)
              .map((factor) => factor.CATEGORIA)
          ),
        ];
        this.form.get('CATEGORIA')?.enable();

        this.form
          .get('CATEGORIA')
          ?.valueChanges.subscribe((selectedCategoria) => {
            this.concatenados = [
              ...new Set(
                this.factores
                  .filter((factor) => factor.CATEGORIA === selectedCategoria)
                  .map((factor) => factor.CONCATENADO)
              ),
            ];
            this.form.get('CONCATENADO')?.enable();
            this.cdRef.detectChanges();
          });

        this.form
          .get('CONCATENADO')
          ?.valueChanges.subscribe((selectedConcatenado) => {
            this.unidades = [
              ...new Set(
                this.factores
                  .filter(
                    (factor) => factor.CONCATENADO === selectedConcatenado
                  )
                  .map((factor) => factor.UNIDADFE)
              ),
            ];
            this.form.get('UNIDADFE')?.enable();
            this.cdRef.detectChanges();
          });
      });
    } catch (error) {
      console.error('Error al consultar los datos:', error);
    }
    // console.log(this.establecimientos)
  }

  formularioAbierto: boolean = false;
  formularioEstablecimientoAbierto: boolean = false;

  mostrarFormulario(): void {
    this.formularioAbierto = true;
  }

  cerrarFormulario(): void {
    this.formularioAbierto = false;
  }

  //Formulario Establecimientos
  mostrarFormularioEstablecimiento(): void {
    this.formularioEstablecimientoAbierto = true;
  }

  cerrarFormularioEstablecimiento(): void {
    this.formularioEstablecimientoAbierto = false;
  }

  manejarClick(): void {
    if (this.formularioAbierto) {
      this.cerrarFormulario();  // si el formulario está abierto, ciérralo
    } else {
      this.mostrarFormulario();  // si el formulario está cerrado, ábrelo
    }
  }

  async agregarEmision() {
    const nickname = 'HolaMundo'

    if (this.form.valid) {
      const values = this.form.value;

      const factoresRelevantes = this.factores.filter(
        (factor) => factor.CONCATENADO === values.CONCATENADO
      );
      const INCERTIDUMBRE = factoresRelevantes[0]?.INCERTIDUMBRE || '';
      const ORIGENFE = factoresRelevantes[0]?.ORIGENFE || '';
      const cantidad = parseFloat(values.CANTIDAD);

      const formatDateToAWSDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // los meses en JS empiezan desde 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      // Descomponer el valor de CONCATENADO en sus tres partes
      const [subcategoria, actividad, combustible] =
        values.CONCATENADO.split(' - ');
      // Inicializar valores de gases
      let CO2 = 0,
        CH4 = 0,
        N2O = 0,
        SF6 = 0,
        HFC = 0,
        PFC = 0,
        NF3 = 0;

      // Calcular emisiones basadas en factores relevantes
      factoresRelevantes.forEach((factor) => {
        const emision = factor.VALORFE * cantidad;
        switch (factor.CONTAMINANTE) {
          case 'Dióxido de Carbono (CO2)':
            CO2 += emision;
            break;
          case 'Metano (CH4)':
            CH4 += emision;
            break;
          case 'Óxido Nitroso (N2O)':
            N2O += emision;
            break;
          case 'Hexafluoruro de azufre (SF6)':
            SF6 += emision;
            break;
          case 'Hidrofluorocarbono (HFC)':
            HFC += emision;
            break;
          case 'Perfluorocarbono (PFC)':
            PFC += emision;
            break;
          case 'Trifluoruro de nitrógeno (NF3)':
            NF3 += emision;
            break;
          default:
            console.error(`Contaminante no reconocido: ${factor.CONTAMINANTE}`);
        }
      });

      // Crear un objeto Emision basado en los valores del formulario
      if (nickname) {
        const emision = new Emision({
          Company: nickname, // Ahora obtenemos el nickname del usuario Cognito
          ALCANCE: values.ALCANCE,
          CATEGORIA: values.CATEGORIA,
          SUBCATEGORIA: subcategoria,
          ACTIVIDAD: actividad,
          COMBUSTIBLE: combustible,
          UNIDADFE: values.UNIDADFE,
          CANTIDAD: cantidad,
          CO2: CO2,
          CH4: CH4,
          N2O: N2O,
          SF6: SF6,
          HFC: HFC,
          PFC: PFC,
          NF3: NF3,
          InicioPeriodo: formatDateToAWSDate(values.InicioPeriodo),
          TerminoPeriodo: formatDateToAWSDate(values.TerminoPeriodo),
          INCERTIDUMBRE: INCERTIDUMBRE,
          ORIGENFE: ORIGENFE,
          companyID: this.companyID!,
          userID: this.userID!,
          EstablishmentID: values.ESTABLECIMIENTO
        });

        // Guardar el objeto Emision en DataStore
        try {
          await DataStore.save(emision);
          this.snackBar.open('Emisión guardada con éxito!', 'Cerrar', {
            duration: 2000,
          });
          Hub.dispatch('emisiones', {
            event: 'nuevaEmision',
            data: emision
          });
          this.cancelarFormulario();
          await this.cargarEmisiones();
        } catch (error) {
          this.snackBar.open('Error al guardar la emisión', 'Cerrar', {
            duration: 2000,
          });
          console.error('Error al guardar en DataStore:', error);
        }
      } else {
        this.snackBar.open(
          'Por favor, completa todos los campos requeridos',
          'Cerrar',
          {
            duration: 2000,
          }
        );
      }
    }
  }

  //TODO: CREAR ESTABLECIMIENTO:
  async manejarClickEstablecimiento() {

    if (this.formularioEstablecimientoAbierto) {
      this.cerrarFormularioEstablecimiento();  // si el formulario está abierto, ciérralo
    } else {
      this.mostrarFormularioEstablecimiento();  // si el formulario está cerrado, ábrelo
    }
  }
  async agregarEstablecimiento() {
    if (this.formEstablecimiento.valid) {
      const nombre = this.formEstablecimiento.value.ESTABLECIMIENTO;

      // TODO: Verificar si ya existe un establecimiento con el mismo nombre
      const existeEstablecimiento = this.establecimientos.find(est => est.name === nombre);

      if (existeEstablecimiento) {
        this.snackBar.open('Ya existe un establecimiento con este nombre', 'Cerrar', {
          duration: 2000,
        });
        return;
      }

      if (this.companyID !== null) {
        const establecimiento = new Establishment({
          companyID: this.companyID,
          name: nombre
        });

        try {
          await DataStore.save(establecimiento);
          this.snackBar.open('Establecimiento guardado con éxito!', 'Cerrar', {
            duration: 2000,
          });
          this.cancelarFormularioEstablecimiento();
          await this.cargarEstablecimiento();
        } catch (error) {
          this.snackBar.open('Error al guardar el establecimiento', 'Cerrar', {
            duration: 2000,
          });
          console.error('Error al guardar en DataStore:', error);
        }
      } else {
        console.error('companyID is null');
      }
    }
  }


  cancelarFormulario() {
    this.formularioAbierto = false;
    this.form.reset();
  }

  cancelarFormularioEstablecimiento() {
    this.formularioAbierto = false;
    this.form.reset();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.emisiones.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.emisiones.forEach((row) => this.selection.select(row));
  }

  async eliminarSeleccionados(): Promise<void> {
    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar los registros seleccionados?'
    );

    if (!confirmar) {
      return;
    }

    // Obtiene los códigos únicos de los elementos seleccionados
    const codigosAEliminar = [
      ...new Set(this.selection.selected.map((item) => item.id)),
    ];

    for (const id of codigosAEliminar) {
      const itemsConMismoCod = await DataStore.query(Emision, (c) =>
        c.id.eq(id)
      );

      for (const item of itemsConMismoCod) {
        try {
          await DataStore.delete(Emision, item.id);
        } catch (error) {
          console.error('Error al eliminar el factor:', error);
        }
      }
    }

    // Actualiza el arreglo local filtrando por los códigos que no deben ser eliminados
    this.emisiones = this.emisiones.filter(
      (emision) => !codigosAEliminar.includes(emision.id)
    );

    // Limpia la selección
    this.selection.clear();
  }

  private convertToCSV(objArray: any[]): string {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    const row = Object.keys(array[0])
      .map((key) => `"${key}"`)
      .join(',');

    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') line += ',';
        line += `"${array[i][index]}"`;
      }
      str += line + '\r\n';
    }
    return str;
  }

  private descargarCSV(data: string, filename = 'download.csv'): void {
    const blob = new Blob(['\ufeff' + data], {
      type: 'text/csv;charset=utf-8;',
    });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);

    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename);
    dwldLink.style.visibility = 'hidden';

    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  public generarYDescargarCSVEmisiones(): void {
    const csvData = this.convertToCSV(this.emisiones);
    this.descargarCSV(csvData, 'emisiones.csv');
  }

  descargarPlantilla() {
    const url = 'assets/templates/EmisionesMasivasCO2.xlsx';

    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantillaEmisiones.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


}
