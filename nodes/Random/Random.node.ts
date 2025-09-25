import { INodeType, INodeTypeDescription, INodeExecutionData, NodeOperationError, IExecuteFunctions } from 'n8n-workflow';
import fetch from 'node-fetch';


export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'Random',
        icon: 'file:Random.svg',
        group: ['transform'],
        version: 1,
        description: 'Generate a true random number using Random.org',
        defaults: { name: 'Random', color: '#2188b0ff' },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                description: 'Minimum number',
                required: true,
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 10,
                description: 'Maximum number',
                required: true,
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i) as number;
            const max = this.getNodeParameter('max', i) as number;

            if (min > max) throw new NodeOperationError(this.getNode(), 'Min cannot be greater than Max');

            const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
            const response = await fetch(url);
            const value = parseInt((await response.text()).trim(), 10);

            returnData.push({ json: { value } });
        }

        return [returnData];
    }
}
