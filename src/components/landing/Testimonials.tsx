export function Testimonials() {
  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'CEO, Silva Consultoria',
      content: 'O Vika Zyntro transformou nossa gestão financeira. Economizamos 15 horas por semana em processos manuais.',
    },
    {
      name: 'Ana Rodrigues',
      role: 'Diretora Financeira, TechStart',
      content: 'A emissão de notas fiscais ficou muito mais simples. Sistema intuitivo e suporte excelente!',
    },
    {
      name: 'Roberto Santos',
      role: 'Contador, Santos & Associados',
      content: 'Recomendo para todos os meus clientes. Relatórios precisos e integração perfeita com os processos contábeis.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600">
            Empresas de todos os tamanhos confiam no Vika Zyntro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


