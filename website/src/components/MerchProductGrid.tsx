import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MERCH_PRODUCTS,
  productJsonUrl,
  productUrl,
  type MerchProductConfig,
} from "@/lib/merchProducts";

type LoadedProduct = MerchProductConfig & {
  shopUrl: string;
};

const formatPrice = (price: string) => {
  const n = Number.parseFloat(price);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : `$${price}`;
};

const loadProduct = async (config: MerchProductConfig): Promise<LoadedProduct> => {
  const shopUrl = productUrl(config.handle);
  try {
    const res = await fetch(productJsonUrl(config.handle));
    if (!res.ok) throw new Error("fetch failed");
    const data = (await res.json()) as {
      product: {
        title: string;
        images: { src: string }[];
        variants: { price: string }[];
      };
    };
    const { product } = data;
    return {
      ...config,
      title: product.title,
      price: product.variants[0]?.price ?? config.price,
      image: product.images[0]?.src ?? config.image,
      shopUrl,
    };
  } catch {
    return { ...config, shopUrl };
  }
};

const MerchProductGrid = () => {
  const [products, setProducts] = useState<LoadedProduct[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(MERCH_PRODUCTS.map(loadProduct)).then((loaded) => {
      if (!cancelled) setProducts(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = products ?? MERCH_PRODUCTS.map((p) => ({ ...p, shopUrl: productUrl(p.handle) }));

  return (
    <section
      className="border-t border-white/15 pt-14 md:pt-16 mb-16 md:mb-20"
      aria-labelledby="merch-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="merch-heading" className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <Shirt className="h-7 w-7 text-teal-400" />
            Merch & apparel
          </h2>
          <p className="text-gray-300 mt-2 text-sm md:text-base max-w-xl">
            Hoodies and more from{" "}
            <a
              href="https://801familymerch.myshopify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 hover:text-teal-200 underline-offset-2 hover:underline"
            >
              801 Family Merch
            </a>
            . Choose your size and checkout on Shopify.
          </p>
        </motion.div>
        <a
          href="https://801familymerch.myshopify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-teal-300 hover:text-teal-200 inline-flex items-center gap-1 shrink-0"
        >
          Full Merch store
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item, index) => (
          <motion.article
            key={item.handle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm overflow-hidden flex flex-col"
          >
            <a
              href={item.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-square bg-black/30 overflow-hidden group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
              <p className="text-xl font-bold text-teal-300 mt-2">{formatPrice(item.price)}</p>
              <p className="text-xs text-gray-400 mt-1">Sizes XS–4XL · Printed on demand</p>
              <Button
                asChild
                variant="outline"
                className="mt-5 w-full rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <a href={item.shopUrl} target="_blank" rel="noopener noreferrer">
                  View on Shopify
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.article>
        ))}
        </div>
      </section>
  );
};

export default MerchProductGrid;
