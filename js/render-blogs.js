function loadBlogSection(category) {
    const container = document.getElementById('blog-container');
    const blogs = blogData[category] || [];
    
    container.innerHTML = blogs.map(blog => `
        <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <a href="${blog.link}"><img src="${blog.img}" class="h-56 w-full object-cover"></a>
            <div class="p-6">
                <span class="text-xs font-bold text-[#DC2626] bg-red-50 px-2 py-1 rounded">${blog.cat}</span>
                <h3 class="text-lg font-bold mt-3 group-hover:text-[#DC2626]">${blog.title}</h3>
                <p class="text-sm text-slate-600 mt-2">${blog.desc}</p>
                <div class="flex justify-between items-center mt-4 text-xs text-slate-500">
                    <span>${blog.time} okuma</span>
                    <a href="${blog.link}" class="font-bold text-[#DC2626]">Devamını Oku →</a>
                </div>
            </div>
        </article>
    `).join('');
}