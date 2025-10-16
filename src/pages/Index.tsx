import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
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

    return () => observerRef.current?.disconnect();
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">SKINCARE BEAUTY</span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {['home', 'catalog', 'about', 'ingredients', 'reviews', 'routines', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-gray-400'
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
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black text-white border-l border-gray-800">
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

      <section id="home" className="pt-24 pb-20 bg-gradient-to-b from-black via-gray-900 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary">Натуральная косметика</Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                Твоя кожа
                <br />
                <span className="text-primary">заслуживает лучшего</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                Профессиональный уход с научно доказанными ингредиентами. 
                Создаем продукты, которые работают.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold px-8">
                  <Icon name="Play" size={20} className="mr-2" />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8">
                  Добавить в рутину
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/ed822405-24fb-4bd8-b1ec-e70149473da5.jpg"
                alt="Hero product"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Каталог продуктов</h2>
            <p className="text-muted-foreground text-lg">Подобрано специально для вашей кожи</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`rounded-full font-semibold transition-all ${
                  selectedCategory === category 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'border-2 border-gray-300 hover:border-primary hover:text-primary'
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
                className="animate-on-scroll group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover-scale"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">{product.category}</Badge>
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.ingredients.slice(0, 2).map((ing, idx) => (
                      <span key={idx} className="text-xs text-muted-foreground">
                        {ing}{idx < 1 && ', '}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">О бренде</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы создаем косметику, которая работает. Каждый продукт разработан 
                с использованием научно доказанных ингредиентов и тщательно протестирован.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Наша миссия — сделать профессиональный уход доступным каждому. 
                Мы верим в силу натуральных компонентов и инновационных формул.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Натуральные</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">0</div>
                  <div className="text-sm text-muted-foreground">Парабенов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5★</div>
                  <div className="text-sm text-muted-foreground">Рейтинг</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://cdn.poehali.dev/projects/7b059d7c-e0dc-4a6b-8b88-bbbd16ab4e47/files/50ade618-584c-4504-8c2c-b13aeb09a384.jpg"
                alt="About us"
                className="w-full rounded-3xl shadow-xl hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="ingredients" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ключевые ингредиенты</h2>
            <p className="text-muted-foreground text-lg">Только то, что работает</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredients.map((ingredient, idx) => (
              <Card 
                key={idx} 
                className="animate-on-scroll p-8 text-center hover:shadow-lg transition-all hover-scale border-2 hover:border-primary"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={ingredient.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="routines" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Рутины ухода</h2>
            <p className="text-muted-foreground text-lg">Пошаговое руководство для идеальной кожи</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {routines.map((routine, idx) => (
              <Card 
                key={idx} 
                className="animate-on-scroll p-8 hover:shadow-xl transition-all hover-scale border-2 hover:border-primary"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={routine.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{routine.time}</h3>
                </div>
                <div className="space-y-3">
                  {routine.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                        {stepIdx + 1}
                      </div>
                      <span className="text-lg">{step}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы</h2>
            <p className="text-muted-foreground text-lg">Что говорят наши клиенты</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card 
                key={idx} 
                className="animate-on-scroll p-6 hover:shadow-lg transition-all hover-scale"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <p className="font-semibold">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Остались вопросы?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Свяжитесь с нами, и наши эксперты помогут подобрать идеальный уход для вашей кожи
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-semibold px-8">
                <Icon name="Mail" size={20} className="mr-2" />
                Написать нам
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
            </div>
            <div className="flex justify-center gap-6">
              <Icon name="Instagram" size={24} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Icon name="Facebook" size={24} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Icon name="Mail" size={24} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-black text-gray-400 border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 SKINCARE BEAUTY. Все права защищены.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;