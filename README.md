# Menorca VT

## Dependencia de geocomponents

Los componentes presentacionales los trabajamos en https://github.com/geomatico/geocomponents

Podemos depender de una versión local para probar su integración en desarrollo:

```bash
npm install ../../geomatico/geocomponents # Path relativo al checkout local
```

Ojo, se enlaza el `build` del repo local.

**¡No commitear esta dependencia local!**

El código commiteado siempre debe depender de una versión conocida de geocomponents:

```bash
npm uninstall geocomponents # por si acaso
npm install git+ssh://github.com/geomatico/geocomponents.git#v0.0.2
```
