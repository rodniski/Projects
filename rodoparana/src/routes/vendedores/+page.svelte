<script>
	import { onMount } from 'svelte';
	import jsonData from './consulta/vendedores.json';
	import '../../app.css';

	let filteredData = [];
	let filialKeyword = '';
	let codigoKeyword = '';
	let nomeKeyword = '';

	// Carrega os dados JSON no momento da montagem do componente
	onMount(() => {
		filteredData = jsonData;
	});

	function handleFilter() {
		const filialLower = filialKeyword.toLowerCase();
		const codigoLower = codigoKeyword.toLowerCase();
		const nomeLower = nomeKeyword.toLowerCase();

		filteredData = jsonData.filter(
			(item) =>
				item.FILIAL.toLowerCase().includes(filialLower) &&
				item.COD.toLowerCase().includes(codigoLower) &&
				item.NOME.toLowerCase().includes(nomeLower)
		);
	}
</script>

<main class="ml-[5rem] p-1">
	<div class="align-center px-4">
		<div class="bg-base-300 dark:bg-gray-800 shadow-md sm:rounded-xl overflow-hidden">
			<div>
				<table class="table table-s">
					<thead>
						<tr>
							<th
								><input
									type="text"
									class="input w-full max-w-xs"
									placeholder="Filial"
									bind:value={filialKeyword}
									on:input={handleFilter}
								/></th
							>
							<th
								><input
									type="text"
									class="input w-full max-w-xs"
									placeholder="Codigo"
									bind:value={codigoKeyword}
									on:input={handleFilter}
								/></th
							>
							<th>Nome/th </th>
						</tr>
					</thead>
					<tbody>
						{#each filteredData as item}
							<tr class="hover">
								<td>{item.FILIAL}</td>
								<td>{item.COD}</td>
								<td>{item.NOME}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</main>

<style>
	:root {
		font-size: 16px;
		--text-primary: #b6b6b6;
		--text-secondary: #ececec;
		--bg-primary: #23232e;
		--bg-primary: #141418;
	}
	main {
		margin-left: 5rem;
		padding: 1rem;
	}
</style>
