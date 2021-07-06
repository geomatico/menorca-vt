
## Generar sprites

Necesitaremos spritezero-cli, una utilidad para convertir de svg a sprites. Se instala mediante npm:

```shell
npm install -g @geomatico/spritezero-cli
```

Y ya podemos generar los sprites:

```shell
spritezero sprites svg/ && spritezero --retina sprites@2x svg/
```

Esto generará los síguientes ficheros:

```shell
sprites@2x.json
sprites@2x.png
sprites.json
sprites.png
```

