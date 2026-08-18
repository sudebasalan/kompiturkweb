function loadBlogSection(category) {
    const container = document.getElementById('blog-container');
    if (!container) return;
    
    const blogs = blogData[category] || [];
    
    container.innerHTML = blogs.map(blog => `
        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
                <a href="${blog.link}" class="block">
                    <div class="rounded-t-2xl overflow-hidden h-56 w-full bg-slate-100 flex items-center justify-center">
                        <img src="${blog.img}" alt="${blog.title}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
                    </div>
                </a>
                <div class="p-6 space-y-3">
                    <span class="inline-block text-xs font-bold text-[#DC2626] bg-red-50 px-2.5 py-1 rounded-lg">${blog.cat}</span>
                    <h3 class="text-lg font-bold text-[#0F172A] group-hover:text-[#DC2626] transition-colors leading-snug">
                        <a href="${blog.link}">${blog.title}</a>
                    </h3>
                    <p class="text-slate-600 text-sm line-clamp-3 leading-relaxed">${blog.desc}</p>
                </div>
            </div>
            <div class="px-6 pb-6 pt-2 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold mt-auto">
                <span class="text-slate-400">${blog.time} okuma</span>
                <a href="${blog.link}" class="text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Devamını Oku →
                </a>
            </div>
        </article>
    `).join('');
}