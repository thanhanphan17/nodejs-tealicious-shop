$(function () {
    Morris.Donut({
        element: 'morris-donut-chart',
        data: [
            {
                label: 'Phong Vị Yên Trà',
                value: 12
            },
            {
                label: 'Hoa Cỏ Dưỡng Tâm',
                value: 30
            },
            {
                label: 'Thảo Mộc Nhiệt Đới',
                value: 20
            },
            {
                label: 'An Yên Ngự Trà',
                value: 20
            }
        ],
        resize: true
    })
})
