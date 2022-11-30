const limit = 25
let page = 1
const getContactsListQueryUrl = '/api/v4/contacts'

const getContacts = async () => {
    try {
        const response = await fetch(getContactsListQueryUrl,
            {
                limit: limit,
                page: page,
                with: 'leads'
            })
        const contacts = await response.json()

        page++

        return !!contacts ? contacts : console.log('Контактов нет')

    } catch {
        console.log('Что-то пошло не так c получением контактов')
        console.log(response)
    }
}

const postTasksQueryUrl = '/api/v4/tasks'
const taskText = 'Контакт без сделок'

const postTasks = async (data) => {
    try {
        const response = await fetch(postTasksQueryUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await response.json()

    } catch {
        console.log('Что-то пошло не так c отправкой задач')
        console.log(response)
    }
}

const setTask = async (taskText) => {
    try {
        const contacts = await getContacts()
        let tasks = contacts.map(item => {
            return {
                text: taskText,
                complete_till: 1588885140,
                entity_id: item.id,
                entity_type: 'contacts'
            }
        })

        postTasks(tasks)

    } catch {
        console.log('Ошибка')
    }
}

setTask(taskText)