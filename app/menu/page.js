import Link from "next/link";

const dishes = [
  { id: 1, name: "Doro Wat", description: "Traditional Ethiopian chicken stew with berbere spices.", price: 250, category: "Ethiopian", emoji: "🍲" },
  { id: 2, name: "Tibs Special", description: "Sautéed beef with onions, peppers, and herbs.", price: 300, category: "Ethiopian", emoji: "🥘" },
  { id: 3, name: "Kitfo", description: "Seasoned minced beef, Ethiopian style.", price: 350, category: "Ethiopian", emoji: "🍛" },
  { id: 4, name: "Addis Special Pizza", description: "Cheesy pizza with fresh toppings.", price: 420, category: "Italian", emoji: "🍕" },
  { id: 5, name: "Classic Burger", description: "Beef burger with lettuce, tomato, and sauce.", price: 300, category: "Fast food", emoji: "🍔" },
  { id: 6, name: "Fresh Salad", description: "Crisp seasonal vegetables and house dressing.", price: 180, category: "Healthy", emoji: "🥗" }
];

export default function MenuPage() {
  return <section>
    <div className="eyebrow">MADE FRESH DAILY</div><h1>Our menu</h1>
    <p className="lead">Local favorites and comfort food, made with care.</p>
    <div className="menu-grid">{dishes.map((dish) => <article className="dish-card" key={dish.id}>
      <div className="dish-art">{dish.emoji}</div><div className="dish-content"><span className="tag">{dish.category}</span><h2>{dish.name}</h2><p>{dish.description}</p><div className="dish-bottom"><strong>{dish.price} Birr</strong><Link href="/checkout" className="secondary-button">Order</Link></div></div>
    </article>)}</div>
  </section>;
}
