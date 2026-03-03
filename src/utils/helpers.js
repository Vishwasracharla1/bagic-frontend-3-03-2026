export function getContentIcon(type) {
    const icons = {
        'Article': 'file-alt',
        'Video': 'video',
        'Interactive': 'gamepad',
        'Case Study': 'briefcase',
        'Workshop': 'chalkboard-teacher',
    };
    return icons[type] || 'file';
}

export function getNudgeIcon(type) {
    const icons = {
        'action': 'bolt',
        'celebration': 'trophy',
        'recommendation': 'lightbulb',
        'reminder': 'bell',
    };
    return icons[type] || 'bell';
}

export function getBadgeClass(status) {
    const map = {
        'active': 'bg-success/10 text-success',
        'on-track': 'bg-success/10 text-success',
        'at-risk': 'bg-danger/10 text-danger',
        'needs-attention': 'bg-warning/10 text-[#F57C00]',
        'exceeding': 'bg-[rgba(156,39,176,0.1)] text-[#7B1FA2]',
        'success': 'bg-success/10 text-success',
        'warning': 'bg-warning/10 text-[#F57C00]',
        'danger': 'bg-danger/10 text-danger',
        'info': 'bg-info/10 text-info',
    };
    return map[status] || 'bg-gray-200 text-gray-700';
}

export function getProgressBarColor(progress) {
    if (progress >= 70) return 'bg-success';
    if (progress >= 40) return 'bg-warning';
    return 'bg-danger';
}
