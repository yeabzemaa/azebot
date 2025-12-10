export const productsData = {
  products: [
    {
      id: "prod_001",
      name: "Habesha Kemis - Traditional White",
      slug: "habesha-kemis-traditional-white",
      description: "Elegant handwoven Ethiopian dress with intricate tibeb embroidery. Perfect for celebrations and cultural events. Each piece is handcrafted by skilled artisans using traditional weaving techniques passed down through generations.",
      price: 149.99,
      images: ["https://images.unsplash.com/photo-1633980990916-74317cba1ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjB0cmFkaXRpb25hbCUyMHdoaXRlJTIwZHJlc3MlMjBoYWJlc2hhfGVufDF8fHx8MTc2NTM2MTAyOHww&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "women" as const,
      type: "dress" as const,
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Cream", hex: "#FAF8F3" }
      ],
      sizes: ["S", "M", "L", "XL"] as const,
      inStock: true,
      featured: true,
      new: false,
      rating: 4.8,
      reviewCount: 23,
      details: {
        material: "100% handwoven cotton",
        care: "Hand wash cold, line dry",
        origin: "Handcrafted in Ethiopia"
      }
    },
    {
      id: "prod_002",
      name: "Netela Scarf - Classic Border",
      slug: "netela-scarf-classic-border",
      description: "Traditional Ethiopian shawl featuring colorful tibeb borders. Lightweight and versatile, perfect for any occasion. The geometric patterns are hand-embroidered with vibrant threads.",
      price: 45.99,
      images: ["https://images.unsplash.com/photo-1607779142745-5254831701f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRyYWRpdGlvbmFsJTIwc2NhcmYlMjBzaGF3bHxlbnwxfHx8fDE3NjUzNjEwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "women" as const,
      type: "scarf" as const,
      colors: [
        { name: "White/Gold", hex: "#FFFFFF" },
        { name: "White/Red", hex: "#FFFFFF" },
        { name: "White/Green", hex: "#FFFFFF" }
      ],
      sizes: ["One Size"] as const,
      inStock: true,
      featured: true,
      new: true,
      rating: 4.9,
      reviewCount: 45,
      details: {
        material: "100% cotton muslin",
        care: "Machine wash cold, tumble dry low",
        origin: "Handcrafted in Ethiopia"
      }
    },
    {
      id: "prod_003",
      name: "Men's Tunic - Earth Tone",
      slug: "mens-tunic-earth-tone",
      description: "Contemporary take on traditional Ethiopian men's wear. Comfortable linen blend with subtle embroidered collar detail. Perfect for casual or semi-formal occasions.",
      price: 79.99,
      salePrice: 64.99,
      images: ["https://images.unsplash.com/photo-1672355908062-69219ae9dcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGxpbmVuJTIwdHVuaWMlMjBtZW5zfGVufDF8fHx8MTc2NTM2MTAyOHww&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "men" as const,
      type: "shirt" as const,
      colors: [
        { name: "Beige", hex: "#E8E0D5" },
        { name: "Coffee Brown", hex: "#5D4E37" },
        { name: "Olive Green", hex: "#708238" }
      ],
      sizes: ["M", "L", "XL", "XXL"] as const,
      inStock: true,
      featured: true,
      new: false,
      rating: 4.6,
      reviewCount: 18,
      details: {
        material: "60% linen, 40% cotton",
        care: "Machine wash cold, line dry recommended",
        origin: "Designed in Ethiopia"
      }
    },
    {
      id: "prod_004",
      name: "Kids Dress - Rainbow Tibeb",
      slug: "kids-dress-rainbow-tibeb",
      description: "Adorable Ethiopian-style dress for children featuring colorful tibeb borders. Soft cotton perfect for sensitive skin. Let your child celebrate heritage in comfort.",
      price: 59.99,
      images: ["https://images.unsplash.com/photo-1652499970111-87ff6257c907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGtpZHMlMjBkcmVzcyUyMGVtYnJvaWRlcmVkfGVufDF8fHx8MTc2NTM2MTAyOXww&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "kids" as const,
      type: "dress" as const,
      colors: [
        { name: "White", hex: "#FFFFFF" }
      ],
      sizes: ["XS", "S", "M", "L"] as const,
      inStock: true,
      featured: false,
      new: true,
      rating: 5.0,
      reviewCount: 12,
      details: {
        material: "100% soft cotton",
        care: "Machine wash cold, tumble dry low",
        origin: "Handcrafted in Ethiopia"
      }
    },
    {
      id: "prod_005",
      name: "Ethiopian Cross Pendant",
      slug: "ethiopian-cross-pendant",
      description: "Intricately designed Ethiopian cross pendant in brass with gold finish. A beautiful symbol of faith and culture. Comes with adjustable chain.",
      price: 34.99,
      images: ["https://images.unsplash.com/photo-1762331974787-76476e26c7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY3Jvc3MlMjBwZW5kYW50JTIwamV3ZWxyeXxlbnwxfHx8fDE3NjUyODQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "accessories" as const,
      type: "jewelry" as const,
      colors: [
        { name: "Gold", hex: "#D4AF37" },
        { name: "Silver", hex: "#C0C0C0" }
      ],
      sizes: ["One Size"] as const,
      inStock: true,
      featured: false,
      new: false,
      rating: 4.7,
      reviewCount: 34,
      details: {
        material: "Brass with gold/silver plating",
        care: "Keep dry, polish with soft cloth",
        origin: "Handcrafted in Ethiopia"
      }
    },
    {
      id: "prod_006",
      name: "Habesha Kemis - Red Border",
      slug: "habesha-kemis-red-border",
      description: "Stunning white dress with vibrant red tibeb embroidery at the neckline and hem. A showstopper for special occasions and celebrations.",
      price: 169.99,
      images: ["https://images.unsplash.com/photo-1762316110550-2a1a05d722f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBlbWJyb2lkZXJlZCUyMHdoaXRlJTIwZHJlc3N8ZW58MXx8fHwxNzY1MzYxMDMwfDA&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "women" as const,
      type: "dress" as const,
      colors: [
        { name: "White/Red", hex: "#FFFFFF" }
      ],
      sizes: ["S", "M", "L", "XL"] as const,
      inStock: true,
      featured: true,
      new: false,
      rating: 4.9,
      reviewCount: 28,
      details: {
        material: "100% handwoven cotton",
        care: "Hand wash cold, line dry",
        origin: "Handcrafted in Ethiopia"
      }
    },
    {
      id: "prod_007",
      name: "Men's Pants - Traditional Cut",
      slug: "mens-pants-traditional-cut",
      description: "Comfortable traditional-style pants in breathable cotton. Features elastic waistband and relaxed fit. Perfect pairing with our tunics.",
      price: 54.99,
      images: ["https://images.unsplash.com/photo-1687226426353-498d40ec6fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNvdHRvbiUyMHBhbnRzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY1MzYxMDMwfDA&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "men" as const,
      type: "pants" as const,
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Beige", hex: "#E8E0D5" },
        { name: "Black", hex: "#000000" }
      ],
      sizes: ["M", "L", "XL", "XXL"] as const,
      inStock: true,
      featured: false,
      new: false,
      rating: 4.5,
      reviewCount: 15,
      details: {
        material: "100% cotton",
        care: "Machine wash cold, tumble dry low",
        origin: "Made in Ethiopia"
      }
    },
    {
      id: "prod_008",
      name: "Woven Basket Bag",
      slug: "woven-basket-bag",
      description: "Handwoven basket bag featuring traditional Ethiopian patterns. Durable and stylish, perfect for everyday use or as a statement piece.",
      price: 39.99,
      images: ["https://images.unsplash.com/photo-1760812655704-7dc53dd36194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGJhc2tldCUyMGJhZyUyMG5hdHVyYWx8ZW58MXx8fHwxNzY1MzYxMDMxfDA&ixlib=rb-4.1.0&q=80&w=1080"],
      category: "accessories" as const,
      type: "other" as const,
      colors: [
        { name: "Natural/Black", hex: "#D2B48C" },
        { name: "Natural/Red", hex: "#D2B48C" }
      ],
      sizes: ["One Size"] as const,
      inStock: true,
      featured: false,
      new: true,
      rating: 4.8,
      reviewCount: 22,
      details: {
        material: "Handwoven grass and thread",
        care: "Spot clean only",
        origin: "Handcrafted in Ethiopia"
      }
    }
  ]
};