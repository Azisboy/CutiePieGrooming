let currentSection = 0;
const sections = document.querySelectorAll('.section');

let currentGalleryPage = 0;
const totalGalleryPages = 3;

// 滚轮处理函数
function handleWheel(e) {
    e.preventDefault();
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
    }
}

// 滚动到指定section
function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        sections[index].classList.add('active');
        currentSection = index;
        updateIndicators();
    }
}

// 创建导航指示器
function createIndicators() {
    const container = document.createElement('ul');
    container.className = 'section-indicator';
    
    sections.forEach((_, index) => {
        const indicator = document.createElement('li');
        indicator.addEventListener('click', () => scrollToSection(index));
        container.appendChild(indicator);
    });
    
    document.body.appendChild(container);
    updateIndicators();
}

// 更新导航指示器
function updateIndicators() {
    const indicators = document.querySelectorAll('.section-indicator li');
    indicators.forEach((indicator, index) => {
        if (index === currentSection) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 处理导航点击
function handleNavClick() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(
                section => section.id === targetId
            );
            if (targetIndex !== -1) {
                scrollToSection(targetIndex);
            }
        });
    });
}

// 处理预约按钮点击事件
function handleBookingClick() {
    const bookingSection = Array.from(sections).findIndex(
        section => section.id === 'booking'
    );
    if (bookingSection !== -1) {
        scrollToSection(bookingSection);
    }
}

// 图片放大功能
function initializeGallery() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    // 添加错误处理
    if (!modal || !modalImg || !captionText || !closeBtn) {
        console.log('Gallery elements not found, skipping gallery initialization');
        return;
    }

    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length === 0) {
        console.log('No gallery images found, skipping gallery initialization');
        return;
    }

    // 为所有 gallery-item 中的图片添加点击事件
    galleryImages.forEach(img => {
        if (img && img.nextElementSibling) {
            img.onclick = function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.nextElementSibling.querySelector('p').innerHTML;
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // 点击关闭按钮关闭模态框
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    // 点击模态框外部关闭
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function changeGalleryPage(direction) {
    const pages = document.querySelectorAll('.gallery-page');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    
    pages[currentGalleryPage].classList.remove('active');
    dots[currentGalleryPage].classList.remove('active');
    
    if (direction === 'next') {
        currentGalleryPage = (currentGalleryPage + 1) % totalGalleryPages;
    } else {
        currentGalleryPage = (currentGalleryPage - 1 + totalGalleryPages) % totalGalleryPages;
    }
    
    pages[currentGalleryPage].classList.add('active');
    dots[currentGalleryPage].classList.add('active');
}

function goToGalleryPage(pageIndex) {
    const pages = document.querySelectorAll('.gallery-page');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    
    pages[currentGalleryPage].classList.remove('active');
    dots[currentGalleryPage].classList.remove('active');
    
    currentGalleryPage = pageIndex;
    
    pages[currentGalleryPage].classList.add('active');
    dots[currentGalleryPage].classList.add('active');
}

// 初始化
function init() {
    // 获取所有section元素
    const sections = document.querySelectorAll('.section');
    
    // 检查是否找到了sections
    if (sections && sections.length > 0) {
        // 确保所有section都隐藏
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示第一个section
        sections[0].classList.add('active');
        
        // 创建导航点
        createIndicators();
        
        // 添加滚轮事件监听
        window.removeEventListener('wheel', handleWheel);
        window.addEventListener('wheel', handleWheel, { passive: false });
        
        // 添加键盘事件支持
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            } else if (e.key === 'ArrowUp' && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        });
        
        // 添加导航点击事件
        handleNavClick();

        // 添加预约按钮点击事件
        const appointmentBtn = document.querySelector('.appointment');
        const ctaBtn = document.querySelector('.cta');
        if (appointmentBtn) appointmentBtn.addEventListener('click', handleBookingClick);
        if (ctaBtn) ctaBtn.addEventListener('click', handleBookingClick);

        // 初始化图片放大功能
        initializeGallery();
    }
}

// 确保在DOM完全加载后再初始化
document.addEventListener('DOMContentLoaded', init); 