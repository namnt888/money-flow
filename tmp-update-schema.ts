
import { pocketbaseRequest } from './src/services/pocketbase/server';

async function updateSchema() {
    try {
        // 1. Get current collection
        const collection = await pocketbaseRequest<any>('/api/collections/batch_items');
        console.log('Current Schema:', JSON.stringify(collection.schema, null, 2));

        const newFields = [
            {
                name: 'month_year',
                type: 'text',
                required: false,
                system: false,
                id: 'month_year_field'
            },
            {
                name: 'phase_id',
                type: 'text',
                required: false,
                system: false,
                id: 'phase_id_field'
            },
            {
                name: 'bank_type',
                type: 'text',
                required: false,
                system: false,
                id: 'bank_type_field'
            }
        ];

        // 2. Add new fields if they don't exist
        const existingNames = new Set(collection.schema.map((f: any) => f.name));
        const updatedSchema = [...collection.schema];

        for (const field of newFields) {
            if (!existingNames.has(field.name)) {
                updatedSchema.push(field);
                console.log(`Adding field: ${field.name}`);
            }
        }

        // 3. Update collection
        await pocketbaseRequest(`/api/collections/${collection.id}`, {
            method: 'PATCH',
            body: {
                schema: updatedSchema
            }
        });

        console.log('Schema updated successfully!');
    } catch (error) {
        console.error('Failed to update schema:', error);
    }
}

updateSchema();
