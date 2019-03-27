import ParagraphData from 'example/mock/paragraph.data'

export default {
    header: null,
    footer: null,
    children: [{
        type: 'list',
        children: [{
            type: 'paragraph',
            children: [{
                type: 'span',
                text: 'what',
            }],
        }, {
            type: 'paragraph',
            children: [{
                type: 'link',
                text: 'what',
            }],
        }],
    }, ParagraphData
    , {
        type: 'heading',
        children: [{
            type: 'link',
            href: 'http://baidu.com',
            text: 'heading of',
        }, {
            type: 'span',
            style: {
                fontWeight: 'bold',
                color: '#234',
            },
            text: ' article',
        }],
    }, {
        type: 'table',
        children: [{
            children: [{
                style: {
                    verticalAlign: 'top',
                },
                text: '1',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '2',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '3',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '速度',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '斯蒂芬斯蒂芬斯蒂芬斯多夫斯蒂芬速度速度的反射盾fs \'dsd防守对方速度反射盾反射盾反射盾速度速度反射盾反射盾反射盾反射盾反射盾发sd',
            }],
        }, {
            children: [{
                style: {
                    verticalAlign: 'top',
                },
                text: '123',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '斯蒂芬',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '速度f',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '1234',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '大夫似的',
            }],
        }, {
            children: [{
                style: {
                    verticalAlign: 'top',
                },
                text: '213',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '4234',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '32423',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '12334',
            }, {
                style: {
                    verticalAlign: 'top',
                },
                text: '2313',
            }],
        }],
    }],
}
