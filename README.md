# RawGraphs
 Aplicação para criar grafos como forma de aprendizado
 ## Ferramentas
  - Criar Grafos/Dígrafos.
  - Exibir a Matriz Adjacente do grafo.
  - Exibir a Matriz Incidente do grafo.
  - Exibir a Lista de Arestas do grafo.
  - Coloração de grafos.
 ## Coloração
   Algoritmo de coloração de grafos utilizando o [problema das 4 cores](https://pt.wikipedia.org/wiki/Teorema_das_quatro_cores#:~:text=O%20teorema%20das%20quatro%20cores,n%C3%A3o%20partilhem%20a%20mesma%20cor.).
  
  * [Algoritmos gulosos](https://pt.wikipedia.org/wiki/Algoritmo_guloso#:~:text=Algoritmo%20guloso%20ou%20m%C3%ADope%20%C3%A9,que%20n%C3%A3o%20%C3%A9%20muito%20comum.) são muito eficientes para esse tipo de problema, e foi exatamente o que foi usado aqui.
  
  Basicamente, o algoritmo colore os vértices do grafo, tal que, nenhum par de vértices adjcentes tenha cores iguais.
