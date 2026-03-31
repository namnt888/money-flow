import { NextResponse } from 'next/server'
import {
  getPocketBaseAccounts,
  getPocketBaseCategories,
  getPocketBaseShops,
} from '@/services/pocketbase/account-details.service'
import { getPocketBasePeople } from '@/services/pocketbase/people.service'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [accounts, people, shops, categories] = await Promise.all([
      getPocketBaseAccounts(),
      getPocketBasePeople(),
      getPocketBaseShops(),
      getPocketBaseCategories(),
    ])

    return NextResponse.json({
      accounts: accounts.map((item) => ({ id: item.id, name: item.name, image_url: item.image_url ?? null })),
      people: people.map((item) => ({
        id: item.id,
        route_id: item.pocketbase_id || item.id,
        name: item.name,
        image_url: item.image_url ?? null,
      })),
      shops: shops.map((item) => ({ id: item.id, name: item.name, image_url: item.image_url ?? null })),
      categories: categories.map((item) => ({ id: item.id, name: item.name, image_url: item.image_url ?? null })),
    })
  } catch (error) {
    console.error('[api/sidebar/search] failed', error)
    return NextResponse.json(
      { accounts: [], people: [], shops: [], categories: [] },
      { status: 200 }
    )
  }
}
