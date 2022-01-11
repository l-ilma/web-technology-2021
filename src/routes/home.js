import { USERS } from '../index.js';

export const getHome = async (req, res) => {
    const { previous, next, pagesNum, q } = await res.pagination;
    const questions = res.pagination.paginated;

    for (let i = 0, n = questions.length; i < n; i++) {
        const [date, time] = new Date(questions[i].CreationDate).toLocaleString().split(', ');
        const authorName = USERS[questions[i].OwnerUserId]?.username;
        questions[i] = {
            ...questions[i],
            CreationDate: `${time}, ${date}`,
            username: authorName || `User with id: ${questions[i].OwnerUserId}`,
        };
    }
    
    const data = {
        search: true,
        questions: res.pagination.paginated,
        previous,
        next,
        pagesNum,
        q
    }

    res.render('../public/views/index.ejs', data);
};
