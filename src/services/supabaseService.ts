// src/services/supabaseService.ts
import { supabase } from '@/lib/supabaseClient'
import { useInfobarStore } from '@/stores/InfoBarStore'

type FilterCondition = {
    column: string
    operator: '=' | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'in'
    value: any
}

function applyFilters(query: any, filters?: FilterCondition[]) {
    if (!filters) return query

    filters.forEach(({ column, operator, value }) => {
        switch (operator) {
            case '=':
            case 'eq':
                query = query.eq(column, value)
                break
            case 'neq':
                query = query.neq(column, value)
                break
            case 'gt':
                query = query.gt(column, value)
                break
            case 'gte':
                query = query.gte(column, value)
                break
            case 'lt':
                query = query.lt(column, value)
                break
            case 'lte':
                query = query.lte(column, value)
                break
            case 'like':
                query = query.like(column, value)
                break
            case 'ilike':
                query = query.ilike(column, value)
                break
            case 'in':
                query = query.in(column, value)
                break
            default:
                console.warn(`Opérateur inconnu: ${operator}`)
        }
    })

    return query
}

export async function selectFromTable<T>(
    table: string,
    columns: string | string[] = '*',
    filters?: FilterCondition[]
): Promise<T[] | null> {
    const infobar = useInfobarStore()
    try {
        let query = supabase.from(table).select(Array.isArray(columns) ? columns.join(',') : columns)

        query = applyFilters(query, filters)

        const { data, error } = await query

        if (error) {
            infobar.showInfobar(`Erreur lors de la récupération de ${table} : ${error.message}`, 'error')
            return null
        }

        return data as T[]
    } catch (err: any) {
        infobar.showInfobar(`Erreur inconnue : ${err.message}`, 'error')
        return null
    }
}

export async function insertIntoTable<T>(
    table: string,
    values: Partial<T>
): Promise<T[] | null> {
    const infobar = useInfobarStore()
    try {
        const { data, error } = await supabase.from(table).insert(values)

        if (error) {
            infobar.showInfobar(`Erreur lors de l'insertion dans ${table} : ${error.message}`, 'error')
            return null
        }

        infobar.showInfobar('Insertion réussie', 'success')
        return data
    } catch (err: any) {
        infobar.showInfobar(`Erreur inconnue : ${err.message}`, 'error')
        return null
    }
}

export async function updateTable<T>(
    table: string,
    values: Partial<T>,
    filters: FilterCondition[]
): Promise<T[] | null> {
    const infobar = useInfobarStore()
    try {
        let query = supabase.from(table).update(values)
        query = applyFilters(query, filters)

        const { data, error } = await query

        if (error) {
            infobar.showInfobar(`Erreur lors de la mise à jour de ${table} : ${error.message}`, 'error')
            return null
        }

        infobar.showInfobar('Mise à jour réussie', 'success')
        return data
    } catch (err: any) {
        infobar.showInfobar(`Erreur inconnue : ${err.message}`, 'error')
        return null
    }
}

export async function deleteFromTable(
    table: string,
    filters: FilterCondition[]
): Promise<boolean> {
    const infobar = useInfobarStore()
    try {
        let query = supabase.from(table).delete()
        query = applyFilters(query, filters)

        const { error } = await query

        if (error) {
            infobar.showInfobar(`Erreur lors de la suppression dans ${table} : ${error.message}`, 'error')
            return false
        }

        infobar.showInfobar('Suppression réussie', 'success')
        return true
    } catch (err: any) {
        infobar.showInfobar(`Erreur inconnue : ${err.message}`, 'error')
        return false
    }
}
