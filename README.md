# avg-lines

```bash
sudo npm -g install avg-lines

avg-lines . -name '*.js'
```

![screenshot from 2016-01-26 03 34 02](https://cloud.githubusercontent.com/assets/6740947/12572001/963d1f06-c3de-11e5-8773-591ba35375f3.png)

A simple CLI for indicating how modular your code is, lower figures are better.

My rules of thumb:

|              |Good | Bad
|--------------|-----|-----
|avg LOC       |> 80 |< 110
|LOC inequality|> 60%|< 85%

Use your own judgement first!

Arguments are passed straight to `find` which enables sophisticated queries, to omit `node_modules`:

```bash
avg-lines . -name '*.js' -not -path '*/node_modules/*'
```

## License
ISC © Ashton War
