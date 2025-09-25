import {
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	NodeOperationError,
	IExecuteFunctions,
} from 'n8n-workflow';
import fetch from 'node-fetch';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:Random.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'True Random Number Generator', 
		description: 'Generate a true random number using Random.org API',
		defaults: { name: 'Random', color: '#2188b0' },
		inputs: ['main'],
		outputs: ['main'],

		properties: [
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				description: 'O valor mínimo para o número aleatório (inclusivo)',
				required: true,
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 10,
				description: 'O valor máximo para o número aleatório (inclusivo)',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;

				if (min > max) {
					throw new NodeOperationError(
						this.getNode(),
						'O valor de "Min" não pode ser maior que o de "Max".',
						{ itemIndex: i },
					);
				}

				const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

				const response = await fetch(url);

				if (!response.ok) {
					throw new NodeOperationError(
						this.getNode(),
						`Erro na API do Random.org: ${response.statusText}`,
						{ itemIndex: i },
					);
				}

				const textValue = (await response.text()).trim();
				const randomNumber = parseInt(textValue, 10);

				if (isNaN(randomNumber)) {
					throw new NodeOperationError(
						this.getNode(),
						`A API retornou um valor não numérico: "${textValue}"`,
						{ itemIndex: i },
					);
				}

				const resultData = {
					...items[i].json,
					value: randomNumber,
					minUsed: min,
					maxUsed: max,
					timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
				};

				returnData.push({ json: resultData });
			} catch (error) {
				if (error instanceof NodeOperationError) {
					throw error;
				}
				throw new NodeOperationError(this.getNode(), `Erro ao executar o nó: ${error.message}`, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}

