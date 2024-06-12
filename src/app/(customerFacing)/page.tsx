// import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
// import { Button } from "@/components/ui/button"
// import db from "@/db/db"
// import { Product } from "@prisma/client"
// import { ArrowRight } from "lucide-react"
// import Link from "next/link"
// import { Suspense } from "react"

// function getMostPopularProducts(){
//   return db.product.findMany({
//     where: { isAvailableForPurchase: true },
//     orderBy: { createdAt: "desc" },
//   })
// }

// export default function HomePage() {
//   return (
//     <main className="space-y-12">
//       <ProductGridSection
//         title="" 
//         productsFetcher={getMostPopularProducts}/>
//     </main>
//   ) }

//   type ProductGridSectionProps = {
//     title: string
//     productsFetcher: () => Promise<Product[]>
//   }
  
//   function ProductGridSection({
//     productsFetcher,
//     title,
//   }: ProductGridSectionProps)  {
//     return (
//       <div className="space-y-4">
//          <div className="flex gap-4">
//         <h2 className="text-3xl font-bold">{title}</h2>
//         <Button variant="outline" asChild>
//           <Link href="/products" className="space-x-2">
//             <span>View All</span>
//             <ArrowRight className="size-4" />
//           </Link>
//         </Button>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <Suspense
//           fallback={
//             <>
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//             </>
//           }
//         >
//           <ProductSuspense productsFetcher={productsFetcher} />
//         </Suspense> 
//         </div>
//         </div>
//       </div>
//     )
//   }

//   async function ProductSuspense({
//     productsFetcher,
//   }: {
//     productsFetcher: () => Promise<Product[]>
//   }) {
//     return (await productsFetcher()).map(product => (
//       <ProductCard key={product.id} {...product} />
//     ))
//   }

import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

const getProducts = cache(() => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    })
  }, ["/products", "getProducts"])

export default function ProductsPage() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    )
  }

  async function ProductsSuspense() {
    const products = await getProducts()
  
    return products.map(product => <ProductCard key={product.id} {...product} />)
  }
  