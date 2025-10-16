import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [scrollY, setScrollY] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, [selectedCategory]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const products = [
    {
      id: 1,
      name: 'Hydra Serum',
      category: 'Сыворотка',
      price: '2 990 ₽',
      image: 'https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/ed822405-24fb-4bd8-b1ec-e70149473da5.jpg',
      ingredients: ['Гиалуроновая кислота', 'Витамин B5', 'Алоэ вера']
    },
    {
      id: 2,
      name: 'Nourish Cream',
      category: 'Крем',
      price: '3 490 ₽',
      image: 'https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/4f8dca3b-2906-4093-bb0f-252b1eabd488.jpg',
      ingredients: ['Масло ши', 'Керамиды', 'Ниацинамид']
    },
    {
      id: 3,
      name: 'Glow Essence',
      category: 'Эссенция',
      price: '2 790 ₽',
      image: 'https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/50ade618-584c-4504-8c2c-b13aeb09a384.jpg',
      ingredients: ['Витамин С', 'Ниацинамид', 'Экстракт зеленого чая']
    },
    {
      id: 4,
      name: 'Pure Cleanser',
      category: 'Очищение',
      price: '1 990 ₽',
      image: 'https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/ed822405-24fb-4bd8-b1ec-e70149473da5.jpg',
      ingredients: ['Салициловая кислота', 'Пантенол', 'Экстракт ромашки']
    },
    {
      id: 5,
      name: 'Bright Toner',
      category: 'Тонер',
      price: '2 290 ₽',
      image: 'https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/50ade618-584c-4504-8c2c-b13aeb09a384.jpg',
      ingredients: ['Экстракт центеллы', 'Ниацинамид', 'Гиалуроновая кислота']
    },
    {
      id: 6,
      name: 'Deep Mask',
      category: 'Маска',
      price: '1 790 ₽',
      image: 'https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/4f8dca3b-2906-4093-bb0f-252b1eabd488.jpg',
      ingredients: ['Глина', 'Древесный уголь', 'Масло чайного дерева']
    }
  ];

  const categories = ['Все', 'Сыворотка', 'Крем', 'Эссенция', 'Очищение', 'Тонер', 'Маска'];
  
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const ingredients = [
    { icon: 'Droplet', name: 'Гиалуроновая кислота', benefit: 'Интенсивное увлажнение' },
    { icon: 'Leaf', name: 'Алоэ вера', benefit: 'Успокаивает кожу' },
    { icon: 'Sparkles', name: 'Витамин С', benefit: 'Сияние и тонус' },
    { icon: 'Shield', name: 'Ниацинамид', benefit: 'Укрепляет барьер' }
  ];

  const routines = [
    { 
      time: 'Утро', 
      icon: 'Sun',
      steps: ['Очищение', 'Тонер', 'Сыворотка', 'Увлажнение', 'SPF'] 
    },
    { 
      time: 'Вечер', 
      icon: 'Moon',
      steps: ['Демакияж', 'Очищение', 'Эссенция', 'Сыворотка', 'Крем'] 
    }
  ];

  const reviews = [
    { name: 'Анна М.', rating: 5, text: 'Лучшая сыворотка, которую я пробовала! Кожа стала заметно более увлажненной.' },
    { name: 'Мария К.', rating: 5, text: 'Натуральные ингредиенты и видимый результат. Рекомендую!' },
    { name: 'Елена С.', rating: 5, text: 'Крем просто волшебный! Подходит для чувствительной кожи.' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary/20 shadow-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow-effect">
                <Icon name="Sparkles" size={20} className="text-background" />
              </div>
              <span className="gradient-gold font-bold text-xl tracking-tight">SKINCARE BEAUTY</span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {['home', 'catalog', 'about', 'ingredients', 'reviews', 'routines', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-semibold smooth-transition hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О бренде'}
                  {section === 'ingredients' && 'Ингредиенты'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'routines' && 'Рутины'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground border-l border-border">
                <div className="flex flex-col gap-6 mt-8">
                  {['home', 'catalog', 'about', 'ingredients', 'reviews', 'routines', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="text-left text-lg font-medium hover:text-primary transition-colors"
                    >
                      {section === 'home' && 'Главная'}
                      {section === 'catalog' && 'Каталог'}
                      {section === 'about' && 'О бренде'}
                      {section === 'ingredients' && 'Ингредиенты'}
                      {section === 'reviews' && 'Отзывы'}
                      {section === 'routines' && 'Рутины'}
                      {section === 'contact' && 'Контакты'}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-24 bg-gradient-to-b from-background via-background to-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,144,80,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(232,183,117,0.05),transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 rounded-full px-4 py-1.5 font-medium glow-effect">Натуральная косметика</Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 gradient-gold leading-tight">
                Твоя кожа
                <br />
                <span className="text-foreground">заслуживает лучшего</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                Профессиональный уход с научно доказанными ингредиентами. 
                Создаем продукты, которые работают.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-background font-semibold px-10 py-6 shadow-lg smooth-transition hover:shadow-xl glow-effect">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-2 border-primary/50 text-primary hover:bg-primary hover:text-background hover:border-primary font-semibold px-10 py-6 smooth-transition">
                  Добавить в рутину
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div 
                className="relative"
                style={{
                  transform: `translateY(${scrollY * 0.15}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src="https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/ed822405-24fb-4bd8-b1ec-e70149473da5.jpg"
                  alt="Hero product"
                  className="w-full max-w-md mx-auto rounded-[2rem] shadow-2xl hover-scale"
                />
              </div>
              <div 
                className="absolute top-10 -left-10 w-32 h-32 bg-gray-200 rounded-[2rem] -z-10 opacity-50"
                style={{
                  transform: `translateY(${scrollY * 0.25}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
              <div 
                className="absolute bottom-10 -right-10 w-40 h-40 bg-gray-300 rounded-[2rem] -z-10 opacity-30"
                style={{
                  transform: `translateY(${scrollY * 0.08}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-24 bg-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,144,80,0.05),transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4 gradient-gold">Каталог продуктов</h2>
            <p className="text-muted-foreground text-xl">Подобрано специально для вашей кожи</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`rounded-full font-semibold smooth-transition shadow-sm ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 shadow-md glow-effect' 
                    : 'bg-background border-2 border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Card 
                key={product.id} 
                className="animate-on-scroll group overflow-hidden border border-border hover:border-primary smooth-transition hover:shadow-2xl hover:glow-effect bg-card rounded-[1.5rem]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                </div>
                <div className="p-6">
                  <Badge className="mb-3 bg-primary/20 text-primary border-0 rounded-full">{product.category}</Badge>
                  <h3 className="font-bold text-xl mb-2 text-foreground">{product.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.ingredients.slice(0, 2).map((ing, idx) => (
                      <span key={idx} className="text-xs text-muted-foreground">
                        {ing}{idx < 1 && ', '}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-gold">{product.price}</span>
                    <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 smooth-transition shadow-md glow-effect">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-gradient-to-b from-background to-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(232,183,117,0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 gradient-gold">О бренде</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Мы создаем косметику, которая работает. Каждый продукт разработан 
                с использованием научно доказанных ингредиентов и тщательно протестирован.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Наша миссия — сделать профессиональный уход доступным каждому. 
                Мы верим в силу натуральных компонентов и инновационных формул.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-gold mb-2">100%</div>
                  <div className="text-sm text-muted-foreground font-medium">Натуральные</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-gold mb-2">0</div>
                  <div className="text-sm text-muted-foreground font-medium">Парабенов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-gold mb-2">5★</div>
                  <div className="text-sm text-muted-foreground font-medium">Рейтинг</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                style={{
                  transform: `translateY(${scrollY * 0.05}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src="https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/50ade618-584c-4504-8c2c-b13aeb09a384.jpg"
                  alt="About us"
                  className="w-full rounded-[2rem] shadow-2xl hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ingredients" className="py-24 bg-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,144,80,0.05),transparent_60%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 gradient-gold">Ключевые ингредиенты</h2>
            <p className="text-muted-foreground text-xl">Только то, что работает</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredients.map((ingredient, idx) => (
              <Card 
                key={idx} 
                className="animate-on-scroll p-8 text-center hover:shadow-2xl hover:glow-effect smooth-transition border border-border hover:border-primary bg-card rounded-[1.5rem]"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 glow-effect">
                  <Icon name={ingredient.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="routines" className="py-24 bg-gradient-to-b from-background to-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(232,183,117,0.06),transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 gradient-gold">Рутины ухода</h2>
            <p className="text-muted-foreground text-xl">Пошаговое руководство для идеальной кожи</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {routines.map((routine, idx) => (
              <Card 
                key={idx} 
                className="animate-on-scroll p-10 hover:shadow-2xl hover:glow-effect smooth-transition border border-border hover:border-primary bg-card rounded-[1.5rem]"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center glow-effect">
                    <Icon name={routine.icon as any} size={26} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-gold">{routine.time}</h3>
                </div>
                <div className="space-y-4">
                  {routine.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-background flex items-center justify-center text-sm font-bold glow-effect">
                        {stepIdx + 1}
                      </div>
                      <span className="text-lg text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-24 bg-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,144,80,0.05),transparent_60%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 gradient-gold">Отзывы</h2>
            <p className="text-muted-foreground text-xl">Что говорят наши клиенты</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card 
                key={idx} 
                className="animate-on-scroll p-8 hover:shadow-2xl hover:glow-effect smooth-transition border border-border hover:border-primary bg-card rounded-[1.5rem]"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{review.text}</p>
                <p className="font-bold text-foreground">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-gradient-to-b from-background to-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,183,117,0.07),transparent_70%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 gradient-gold">Остались вопросы?</h2>
            <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
              Свяжитесь с нами, и наши эксперты помогут подобрать идеальный уход для вашей кожи
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-background font-semibold px-10 py-6 shadow-lg smooth-transition glow-effect">
                <Icon name="Mail" size={20} className="mr-2" />
                Написать нам
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary/50 text-primary hover:bg-primary hover:text-background hover:border-primary font-semibold px-10 py-6 smooth-transition">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
            </div>
            <div className="flex justify-center gap-8">
              <div className="w-12 h-12 rounded-xl bg-muted hover:bg-gradient-to-br hover:from-primary hover:to-secondary flex items-center justify-center smooth-transition cursor-pointer group glow-effect">
                <Icon name="Instagram" size={22} className="text-muted-foreground group-hover:text-background smooth-transition" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-muted hover:bg-gradient-to-br hover:from-primary hover:to-secondary flex items-center justify-center smooth-transition cursor-pointer group glow-effect">
                <Icon name="Facebook" size={22} className="text-muted-foreground group-hover:text-background smooth-transition" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-muted hover:bg-gradient-to-br hover:from-primary hover:to-secondary flex items-center justify-center smooth-transition cursor-pointer group glow-effect">
                <Icon name="Twitter" size={22} className="text-muted-foreground group-hover:text-background smooth-transition" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-background text-muted-foreground border-t border-border relative">
        <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-medium gradient-gold">© 2024 SKINCARE BEAUTY. Все права защищены.</p>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-primary smooth-transition font-medium">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary smooth-transition font-medium">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;