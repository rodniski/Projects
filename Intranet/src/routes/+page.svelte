<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
  
	let estoque = [];
	let searchTerm = '';
  
	const getUsers = async () => {
	  try {
		const res = await axios.get('http://localhost:3000/estoque');
		const data = res.data;
		estoque = data;
	  } catch (error) {
		console.log(error);
	  }
	};
  
	const filterResults = async () => {
	  try {
		const res = await axios.get(`http://localhost:3000/estoque?codigo=${encodeURIComponent(searchTerm)}`);
		const data = res.data;
		estoque = data;
	  } catch (error) {
		console.log(error);
	  }
	};
  
	onMount(getUsers);
  </script>
  
  <main>
	<h1>Axios</h1>
	<hr />
  
	<div class="search-form">
	  <input type="text" bind:value={searchTerm} placeholder="Digite o código" />
	  <button on:click={filterResults}>Pesquisar</button>
	</div>
  
	{#if estoque.length === 0}
	  <p>Loading...</p>
	{:else if estoque.length === 0}
	  <p>Nenhum resultado encontrado.</p>
	{:else}
	  <!-- Tabela com os resultados filtrados -->
	  <div class="">
		<table class="data-table">
		  <!-- Cabeçalho da tabela -->
		  <thead>
			<tr>
			  <th>Filial</th>
			  <th>Codigo</th>
			  <th>Descrição</th>
			  <th>Armazem</th>
			  <th>Categoria</th>
			  <th>Saldo</th>
			  <th>Valor</th>
			  <th>%IPI</th>
			  <th>Valor com IPI</th>
			  <th>Custo Unitário</th>
			  <th>Margem</th>
			  <th>Localização</th>
			  <th>Tipo</th>
			</tr>
		  </thead>
		  <tbody>
			{#each estoque as item}
			  <tr class="table-row">
				<td>{item.FILIAL}</td>
				<td>{item.CODIGO}</td>
				<td>{item.DESCRICAO}</td>
				<td>{item.ARMAZEM}</td>
				<td>{item.CATEGORIA}</td>
				<td>{item.SALDO}</td>
				<td>{item.VALOR}</td>
				<td>{item['PERC IPI']}</td>
				<td>{item['VALOR COM IPI']}</td>
				<td>{item['CUSTO UNITARIO']}</td>
				<td>{item.MARGEM}</td>
				<td>{item.LOCALIZACAO}</td>
				<td>{item.TIPO}</td>
			  </tr>
			{/each}
		  </tbody>
		</table>
	  </div>
	{/if}
  </main>
  
  <style>
	main {
	  text-align: center;
	  padding: 1em;
	  max-width: 1300px;
	  margin: 0 auto;
	}
  
	.search-form {
	  margin-bottom: 1em;
	}
   
	.data-table {
	  width: 100%;
	  border-collapse: collapse;
	  background-color: #fff;
	  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
	}
  
	.data-table th,
	.data-table td {
	  padding: 0.5em;
	  border-bottom: 1px solid #ddd;
	}
  
	.data-table th {
	  background-color: #f5f5f5;
	  font-weight: bold;
	}
  
	.data-table .table-row:nth-child(even) {
	  background-color: #f9f9f9;
	}
  </style>
  