// ========== DATA - ЧАСТИНА 1 ==========
const data = {
    'quick-start': {
        icon: '⚡',
        title: 'Швидкий старт',
        content: [
            {
                id: 'git',
                title: 'Git команди',
                items: [
                    { cmd: 'git init', desc: 'Ініціалізація репозиторію' },
                    { cmd: 'git clone [url]', desc: 'Клонувати репозиторій' },
                    { cmd: 'git add .', desc: 'Додати всі зміни' },
                    { cmd: 'git commit -m "msg"', desc: 'Зробити commit' },
                    { cmd: 'git push origin main', desc: 'Відправити на сервер' },
                    { cmd: 'git pull', desc: 'Отримати зміни' },
                    { cmd: 'git branch -a', desc: 'Показати всі гілки' },
                    { cmd: 'git checkout -b [name]', desc: 'Створити нову гілку' },
                    { cmd: 'git merge [branch]', desc: 'Злити гілку' },
                    { cmd: 'git stash', desc: 'Зберегти незакінчені зміни' },
                    { cmd: 'git stash pop', desc: 'Повернути stash' },
                    { cmd: 'git log --oneline', desc: 'Історія комітів' },
                    { cmd: 'git reset --hard HEAD~1', desc: 'Скасувати останній коміт' },
                    { cmd: 'git rebase main', desc: 'Перебазувати на main' }
                ]
            },
            {
                id: 'npm',
                title: 'NPM команди',
                items: [
                    { cmd: 'npm init -y', desc: 'Створити package.json' },
                    { cmd: 'npm install', desc: 'Встановити залежності' },
                    { cmd: 'npm install [pkg]', desc: 'Встановити пакет' },
                    { cmd: 'npm install -D [pkg]', desc: 'Dev пакет' },
                    { cmd: 'npm uninstall [pkg]', desc: 'Видалити пакет' },
                    { cmd: 'npm update', desc: 'Оновити пакети' },
                    { cmd: 'npm run [script]', desc: 'Запустити скрипт' },
                    { cmd: 'npm audit fix', desc: 'Виправити вразливості' },
                    { cmd: 'npm outdated', desc: 'Застарілі пакети' },
                    { cmd: 'npx [pkg]', desc: 'Виконати без встановлення' }
                ]
            },
            {
                id: 'vite',
                title: 'Vite конфігурація',
                code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})`
            },
            {
                id: 'pkg-scripts',
                title: 'package.json scripts',
                code: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --fix",
    "format": "prettier --write 'src/**/*.{js,jsx}'",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}`
            }
        ]
    },

    'react': {
        icon: '⚛️',
        title: 'React',
        content: [
            {
                id: 'react-hooks',
                title: 'React Hooks',
                code: `// useState
const [count, setCount] = useState(0)
const [user, setUser] = useState({ name: '', age: 0 })

// useEffect
useEffect(() => {
  // Виконується після рендеру
  fetchData()
  
  // Cleanup функція
  return () => cleanup()
}, [dependencies])

// useContext
const theme = useContext(ThemeContext)

// useReducer
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'INCREMENT' })

// useMemo - кешування обчислень
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

// useCallback - кешування функцій
const handleClick = useCallback(() => {
  doSomething(a, b)
}, [a, b])

// useRef - доступ до DOM
const inputRef = useRef(null)
inputRef.current.focus()

// Custom Hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  return [value, setValue]
}`
            },
            {
                id: 'react-patterns',
                title: 'React Patterns',
                code: `// HOC (Higher Order Component)
function withAuth(Component) {
  return function AuthComponent(props) {
    const { user } = useAuth()
    if (!user) return <Redirect to="/login" />
    return <Component {...props} user={user} />
  }
}

// Render Props
function Mouse({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  )
}

// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  componentDidCatch(error, info) {
    console.error(error, info)
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Щось пішло не так</h1>
    }
    return this.props.children
  }
}

// Code Splitting
const LazyComponent = lazy(() => import('./Heavy'))
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>`
            },
            {
                id: 'context-api',
                title: 'Context API',
                code: `// Створення контексту
const AuthContext = createContext()

// Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  
  const login = async (email, password) => {
    const userData = await api.login(email, password)
    setUser(userData)
  }
  
  const logout = () => setUser(null)
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`
            },
            {
                id: 'react-perf',
                title: 'React Оптимізація',
                code: `// React.memo - мемоїзація компонента
const MemoComponent = React.memo(function MyComponent(props) {
  return <div>{props.data}</div>
})

// useMemo для важких обчислень
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value)
}, [data])

// useCallback для функцій
const handleClick = useCallback(() => {
  console.log(value)
}, [value])

// Virtual List
import { FixedSizeList } from 'react-window'

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  )
}`
            }
        ]
    },
    'typescript': {
        icon: '🔷',
        title: 'TypeScript',
        content: [
            {
                id: 'ts-basics',
                title: 'TypeScript Основи',
                code: `// Базові типи
let name: string = 'John'
let age: number = 30
let isActive: boolean = true
let data: any = 'anything'

// Масиви
let numbers: number[] = [1, 2, 3]
let strings: Array<string> = ['a', 'b', 'c']

// Tuple
let tuple: [string, number] = ['age', 30]

// Enum
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

// Union Types
let id: string | number = 123

// Type Alias
type User = {
  id: number
  name: string
  email?: string // Optional
}

// Interface
interface Product {
  id: number
  title: string
  price: number
  readonly createdAt: Date
}

// Function types
function add(a: number, b: number): number {
  return a + b
}

const multiply = (a: number, b: number): number => a * b

// Void
function log(message: string): void {
  console.log(message)
}`
            },
            {
                id: 'ts-advanced',
                title: 'TypeScript Advanced',
                code: `// Generics
function identity<T>(arg: T): T {
  return arg
}

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// Type Guards
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// Utility Types
type User = {
  id: number
  name: string
  email: string
  age: number
}

// Partial - всі поля optional
type PartialUser = Partial<User>

// Required - всі обов'язкові
type RequiredUser = Required<User>

// Pick - вибрати поля
type UserPreview = Pick<User, 'id' | 'name'>

// Omit - виключити поля
type UserWithoutEmail = Omit<User, 'email'>

// Record - об'єкт з ключами
type UserRoles = Record<string, User>

// ReturnType
function getUser() {
  return { id: 1, name: 'John' }
}
type UserType = ReturnType<typeof getUser>

// Conditional Types
type IsString<T> = T extends string ? true : false

// Mapped Types
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}`
            },
            {
                id: 'ts-react',
                title: 'TypeScript + React',
                code: `// Component Props
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

// Events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

// Hooks
const [count, setCount] = useState<number>(0)
const [user, setUser] = useState<User | null>(null)

// useRef
const inputRef = useRef<HTMLInputElement>(null)

// Custom Hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])
  
  return { data, loading, error }
}`
            }
        ]
    },

    'css': {
        icon: '🎨',
        title: 'CSS',
        content: [
            {
                id: 'flexbox',
                title: 'CSS Flexbox',
                items: [
                    { cmd: 'display: flex', desc: 'Увімкнути flexbox' },
                    { cmd: 'flex-direction: row | column', desc: 'Напрямок осі' },
                    { cmd: 'justify-content: center', desc: 'Головна вісь' },
                    { cmd: 'align-items: center', desc: 'Поперечна вісь' },
                    { cmd: 'gap: 1rem', desc: 'Відступ між елементами' },
                    { cmd: 'flex-wrap: wrap', desc: 'Перенесення' },
                    { cmd: 'flex: 1', desc: 'Розтягнути елемент' },
                    { cmd: 'align-self: flex-start', desc: 'Індивідуальне вирівнювання' },
                    { cmd: 'order: 2', desc: 'Порядок елемента' }
                ]
            },
            {
                id: 'grid',
                title: 'CSS Grid',
                items: [
                    { cmd: 'display: grid', desc: 'Увімкнути grid' },
                    { cmd: 'grid-template-columns: repeat(3, 1fr)', desc: '3 рівні колонки' },
                    { cmd: 'grid-template-rows: auto', desc: 'Автоматична висота' },
                    { cmd: 'gap: 1rem', desc: 'Відступ між елементами' },
                    { cmd: 'grid-column: span 2', desc: 'Розтягнути на 2 колонки' },
                    { cmd: 'grid-row: span 2', desc: 'Розтягнути на 2 рядки' },
                    { cmd: 'place-items: center', desc: 'Центрувати вміст' },
                    { cmd: 'grid-auto-flow: dense', desc: 'Щільне заповнення' }
                ]
            },
            {
                id: 'animations',
                title: 'CSS Animations',
                code: `/* Transitions */
.button {
  transition: all 0.3s ease;
}

.button:hover {
  background-color: blue;
  transform: scale(1.1);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: 0.2s;
}

/* Rotate spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}`
            },
            {
                id: 'variables',
                title: 'CSS Variables',
                code: `:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --border-radius: 0.5rem;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #f3f4f6;
  }
}`
            },
            {
                id: 'responsive',
                title: 'Responsive Design',
                code: `/* Mobile First */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}

/* Container queries */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}`
            }
        ]
    },
    'javascript': {
        icon: '📜',
        title: 'JavaScript',
        content: [
            {
                id: 'array-methods',
                title: 'Array методи',
                code: `const arr = [1, 2, 3, 4, 5]

// map - трансформувати
arr.map(item => item * 2) // [2, 4, 6, 8, 10]

// filter - відфільтрувати
arr.filter(item => item > 3) // [4, 5]

// find - знайти перший
arr.find(item => item > 3) // 4

// findIndex - індекс першого
arr.findIndex(item => item > 3) // 3

// reduce - звести до одного значення
arr.reduce((acc, item) => acc + item, 0) // 15

// some - чи є хоч один
arr.some(item => item > 10) // false

// every - чи всі відповідають
arr.every(item => item > 0) // true

// sort - відсортувати
arr.sort((a, b) => a - b) // ascending
arr.sort((a, b) => b - a) // descending

// forEach - ітерація
arr.forEach(item => console.log(item))

// includes - чи містить
arr.includes(3) // true

// slice - копіювати частину
arr.slice(1, 3) // [2, 3]

// splice - видалити/вставити
arr.splice(2, 1) // видалити 1 елемент з індексу 2

// concat - об'єднати
arr.concat([6, 7]) // [1, 2, 3, 4, 5, 6, 7]

// flat - розгорнути
[1, [2, [3, 4]]].flat(2) // [1, 2, 3, 4]

// flatMap - map + flat
arr.flatMap(x => [x, x * 2]) // [1, 2, 2, 4, 3, 6...]`
            },
            {
                id: 'promises',
                title: 'Promises & Async/Await',
                code: `// Promise
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve(data)
  } else {
    reject(error)
  }
})

promise
  .then(result => console.log(result))
  .catch(err => console.error(err))
  .finally(() => console.log('Done'))

// Async/Await
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// Promise.all - всі паралельно
const [users, posts, comments] = await Promise.all([
  fetch('/users').then(r => r.json()),
  fetch('/posts').then(r => r.json()),
  fetch('/comments').then(r => r.json())
])

// Promise.race - перший виконаний
const fastest = await Promise.race([
  fetch('/api1'),
  fetch('/api2')
])

// Promise.allSettled - всі результати
const results = await Promise.allSettled([
  fetch('/api1'),
  fetch('/api2')
])

// Promise.any - перший успішний
const first = await Promise.any([
  fetch('/api1'),
  fetch('/api2')
])`
            },
            {
                id: 'es6-features',
                title: 'ES6+ Features',
                code: `// Destructuring
const { name, age } = user
const [first, second, ...rest] = array

// Spread operator
const newArr = [...arr1, ...arr2]
const newObj = { ...obj1, ...obj2 }

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0)
}

// Template literals
const message = \`Hello \${name}, you are \${age} years old\`

// Arrow functions
const add = (a, b) => a + b
const double = x => x * 2

// Default parameters
function greet(name = 'Guest') {
  return \`Hello, \${name}\`
}

// Optional chaining
const street = user?.address?.street

// Nullish coalescing
const value = data ?? 'default'

// Array/Object methods
Object.keys(obj)
Object.values(obj)
Object.entries(obj)
Object.fromEntries(entries)

// Map & Set
const map = new Map()
map.set('key', 'value')
map.get('key')

const set = new Set([1, 2, 2, 3]) // [1, 2, 3]

// Classes
class User {
  constructor(name) {
    this.name = name
  }
  
  greet() {
    return \`Hi, I'm \${this.name}\`
  }
}`
            },
            {
                id: 'dom-manipulation',
                title: 'DOM Manipulation',
                code: `// Selecting elements
const el = document.querySelector('.class')
const all = document.querySelectorAll('.class')
const byId = document.getElementById('id')

// Creating elements
const div = document.createElement('div')
div.textContent = 'Hello'
div.classList.add('active')
div.setAttribute('data-id', '123')

// Appending
parent.appendChild(child)
parent.append(child1, child2) // multiple
parent.prepend(child) // на початок
el.insertAdjacentHTML('beforeend', '<p>Text</p>')

// Removing
el.remove()
parent.removeChild(child)

// Modifying
el.textContent = 'New text'
el.innerHTML = '<strong>Bold</strong>'
el.style.color = 'red'
el.classList.add('active')
el.classList.remove('hidden')
el.classList.toggle('open')

// Events
el.addEventListener('click', (e) => {
  console.log(e.target)
})

// Event delegation
parent.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    console.log('Button clicked')
  }
})`
            },
            {
                id: 'utility-functions',
                title: 'Utility Functions',
                code: `// Debounce - затримка виконання
function debounce(func, delay) {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// Throttle - обмеження частоти
function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Deep clone
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// Group by
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key]
    result[group] = result[group] ?? []
    result[group].push(item)
    return result
  }, {})
}

// Unique array
const unique = [...new Set(array)]

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
await sleep(1000)`
            }
        ]
    },
    'testing': {
        icon: '🧪',
        title: 'Testing',
        content: [
            {
                id: 'jest-basics',
                title: 'Jest Basics',
                code: `// Basic test
describe('Math operations', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3)
  })
  
  test('object assignment', () => {
    const data = { one: 1 }
    expect(data).toEqual({ one: 1 })
  })
})

// Matchers
expect(value).toBe(4) // ===
expect(value).toEqual({ a: 1 }) // deep equal
expect(value).not.toBe(5)
expect(value).toBeNull()
expect(value).toBeDefined()
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(array).toContain('item')
expect(string).toMatch(/pattern/)
expect(fn).toThrow('error')

// Async tests
test('async test', async () => {
  const data = await fetchData()
  expect(data).toBe('result')
})

// Mock functions
const mockFn = jest.fn()
mockFn('arg')
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith('arg')

// Spies
const spy = jest.spyOn(object, 'method')
spy.mockReturnValue('mocked')

// Setup & Teardown
beforeEach(() => {
  // Перед кожним тестом
})

afterEach(() => {
  // Після кожного тесту
})`
            },
            {
                id: 'react-testing-library',
                title: 'React Testing Library',
                code: `import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('renders button', () => {
  render(<Button>Click me</Button>)
  
  // Queries
  const button = screen.getByText('Click me')
  const input = screen.getByRole('textbox')
  const label = screen.getByLabelText('Name')
  
  expect(button).toBeInTheDocument()
})

test('user interaction', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)
  
  // Type in input
  await user.type(screen.getByLabelText('Email'), 'test@test.com')
  
  // Click button
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  
  // Wait for async
  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})

// Testing with props
test('renders with props', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Test</Button>)
  
  fireEvent.click(screen.getByText('Test'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})`
            },
            {
                id: 'cypress',
                title: 'Cypress E2E',
                code: `describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('logs in user successfully', () => {
    cy.get('[name=email]').type('user@example.com')
    cy.get('[name=password]').type('password123')
    cy.get('button[type=submit]').click()
    
    cy.url().should('include', '/dashboard')
    cy.get('.welcome').should('contain', 'Welcome')
  })

  it('shows error on invalid credentials', () => {
    cy.get('[name=email]').type('wrong@example.com')
    cy.get('[name=password]').type('wrong')
    cy.get('button[type=submit]').click()
    
    cy.get('.error').should('be.visible')
  })
})

// Custom commands
Cypress.Commands.add('login', (email, password) => {
  cy.get('[name=email]').type(email)
  cy.get('[name=password]').type(password)
  cy.get('button[type=submit]').click()
})`
            }
        ]
    },

    'api': {
        icon: '🗄️',
        title: 'API',
        content: [
            {
                id: 'http-status',
                title: 'HTTP статус коди',
                items: [
                    { cmd: '200 OK', desc: 'Успішний запит' },
                    { cmd: '201 Created', desc: 'Ресурс створено' },
                    { cmd: '204 No Content', desc: 'Успіх без тіла відповіді' },
                    { cmd: '400 Bad Request', desc: 'Помилка в запиті' },
                    { cmd: '401 Unauthorized', desc: 'Потрібна авторизація' },
                    { cmd: '403 Forbidden', desc: 'Доступ заборонено' },
                    { cmd: '404 Not Found', desc: 'Ресурс не знайдено' },
                    { cmd: '500 Internal Error', desc: 'Помилка сервера' }
                ]
            },
            {
                id: 'fetch-examples',
                title: 'Fetch API',
                code: `// GET
const data = await fetch('/api/users')
  .then(r => r.json())

// POST
await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})

// PUT
await fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane' })
})

// DELETE
await fetch('/api/users/1', {
  method: 'DELETE'
})

// With error handling
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
  }
}`
            },
            {
                id: 'axios',
                title: 'Axios',
                code: `// GET
const { data } = await axios.get('/api/users')

// POST
await axios.post('/api/users', { name: 'John' })

// PUT
await axios.put('/api/users/1', { name: 'Jane' })

// DELETE
await axios.delete('/api/users/1')

// Request Interceptors
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`
  }
  return config
})

// Response Interceptors
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)`
            }
        ]
    },

    'backend': {
        icon: '🖥️',
        title: 'Backend',
        content: [
            {
                id: 'express',
                title: 'Express.js',
                code: `const express = require('express')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
const cors = require('cors')
app.use(cors())

// Routes
app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id)
  res.json(user)
})

app.post('/api/users', (req, res) => {
  const user = req.body
  users.push(user)
  res.status(201).json(user)
})

app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id)
  Object.assign(user, req.body)
  res.json(user)
})

app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== req.params.id)
  res.status(204).send()
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})`
            },
            {
                id: 'mongodb',
                title: 'MongoDB',
                code: `const { MongoClient } = require('mongodb')

// Connect
const client = new MongoClient(uri)
await client.connect()
const db = client.db('mydb')
const users = db.collection('users')

// Create
await users.insertOne({ name: 'John', age: 30 })
await users.insertMany([
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
])

// Read
const allUsers = await users.find().toArray()
const user = await users.findOne({ name: 'John' })
const filtered = await users.find({ age: { $gt: 25 } }).toArray()

// Update
await users.updateOne(
  { name: 'John' },
  { $set: { age: 31 } }
)
await users.updateMany(
  { age: { $lt: 30 } },
  { $inc: { age: 1 } }
)

// Delete
await users.deleteOne({ name: 'John' })
await users.deleteMany({ age: { $lt: 25 } })

// Aggregation
const result = await users.aggregate([
  { $match: { age: { $gt: 25 } } },
  { $group: { _id: '$age', count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).toArray()`
            },
            {
                id: 'jwt',
                title: 'JWT Authentication',
                code: `const jwt = require('jsonwebtoken')

// Create token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
)

// Verify token middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Protected route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user })
})

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
  res.json({ token, user })
})`
            }
        ]
    },
    'devops': {
        icon: '🐳',
        title: 'DevOps',
        content: [
            {
                id: 'docker-commands',
                title: 'Docker команди',
                items: [
                    { cmd: 'docker ps', desc: 'Запущені контейнери' },
                    { cmd: 'docker ps -a', desc: 'Всі контейнери' },
                    { cmd: 'docker images', desc: 'Список образів' },
                    { cmd: 'docker build -t name .', desc: 'Збудувати образ' },
                    { cmd: 'docker run -p 3000:3000 name', desc: 'Запустити контейнер' },
                    { cmd: 'docker run -d name', desc: 'Запустити в фоні' },
                    { cmd: 'docker stop [id]', desc: 'Зупинити контейнер' },
                    { cmd: 'docker rm [id]', desc: 'Видалити контейнер' },
                    { cmd: 'docker logs [id]', desc: 'Переглянути логи' },
                    { cmd: 'docker exec -it [id] bash', desc: 'Увійти в контейнер' },
                    { cmd: 'docker system prune', desc: 'Очистити невикористане' }
                ]
            },
            {
                id: 'dockerfile',
                title: 'Dockerfile',
                code: `# React app
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
            },
            {
                id: 'docker-compose',
                title: 'Docker Compose',
                code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/mydb
    depends_on:
      - db
    volumes:
      - ./src:/app/src
  
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  db-data:`
            },
            {
                id: 'nginx',
                title: 'Nginx конфігурація',
                code: `server {
    listen 80;
    server_name example.com;

    root /usr/share/nginx/html;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;
}`
            }
        ]
    },

    'regex': {
        icon: '🔤',
        title: 'Regex',
        content: [
            {
                id: 'regex-patterns',
                title: 'Regex Patterns',
                items: [
                    { cmd: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/', desc: 'Email' },
                    { cmd: '/^\\+?[1-9]\\d{1,14}$/', desc: 'Телефон (міжнародний)' },
                    { cmd: '/^https?:\\/\\/.+/', desc: 'URL' },
                    { cmd: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$/', desc: 'Пароль (8+ символів, A-z, 0-9)' },
                    { cmd: '/^\\d{4}-\\d{2}-\\d{2}$/', desc: 'Дата YYYY-MM-DD' },
                    { cmd: '/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/', desc: 'HEX колір' },
                    { cmd: '/^[0-9]{5}$/', desc: 'Поштовий індекс (5 цифр)' },
                    { cmd: '/^\\d{4}\\s?\\d{4}\\s?\\d{4}\\s?\\d{4}$/', desc: 'Кредитна карта' }
                ]
            },
            {
                id: 'regex-js',
                title: 'Regex в JavaScript',
                code: `const text = 'Hello World 123'
const regex = /\\d+/g

// test - перевірка (true/false)
regex.test(text) // true

// match - знайти всі збіги
text.match(regex) // ['123']
text.match(/\\w+/g) // ['Hello', 'World', '123']

// matchAll - всі збіги з деталями
const matches = [...text.matchAll(/\\w+/g)]

// replace - замінити
text.replace(regex, 'XXX') // 'Hello World XXX'
text.replace(/\\d+/g, (match) => match * 2) // callback

// split - розділити
text.split(/\\s+/) // ['Hello', 'World', '123']

// search - індекс першого збігу
text.search(/\\d+/) // 12

// exec - детальна інформація
const match = regex.exec(text)
// match: ['123', index: 12, input: 'Hello World 123']

// Flags
/pattern/g  // global - всі збіги
/pattern/i  // case-insensitive
/pattern/m  // multiline
/pattern/s  // dotAll`
            },
            {
                id: 'regex-validation',
                title: 'Валідація форм',
                code: `// Email validation
function isValidEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  return regex.test(email)
}

// Phone validation (Ukraine)
function isValidPhone(phone) {
  const regex = /^\\+?38?(0\\d{9})$/
  return regex.test(phone)
}

// Strong password
function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/
  return regex.test(password)
}

// Extract data
const text = "Email: test@example.com, Phone: +380501234567"
const emails = text.match(/[\\w.-]+@[\\w.-]+\\.\\w+/g)
const phones = text.match(/\\+?\\d{10,}/g)`
            }
        ]
    },

    'performance': {
        icon: '⚡',
        title: 'Performance',
        content: [
            {
                id: 'react-optimization',
                title: 'React Performance',
                items: [
                    { cmd: 'React.memo()', desc: 'Мемоїзація компонента' },
                    { cmd: 'useMemo()', desc: 'Кешування обчислень' },
                    { cmd: 'useCallback()', desc: 'Кешування функцій' },
                    { cmd: 'React.lazy()', desc: 'Lazy loading компонентів' },
                    { cmd: 'Code splitting', desc: 'Розділення коду' },
                    { cmd: 'Virtual scrolling', desc: 'Для великих списків' },
                    { cmd: 'Debounce/Throttle', desc: 'Обмеження викликів' },
                    { cmd: 'useTransition()', desc: 'Пріоритизація оновлень' }
                ]
            },
            {
                id: 'web-vitals',
                title: 'Web Vitals',
                items: [
                    { cmd: 'LCP', desc: 'Largest Contentful Paint < 2.5s' },
                    { cmd: 'FID', desc: 'First Input Delay < 100ms' },
                    { cmd: 'CLS', desc: 'Cumulative Layout Shift < 0.1' },
                    { cmd: 'FCP', desc: 'First Contentful Paint < 1.8s' },
                    { cmd: 'TTFB', desc: 'Time to First Byte < 600ms' },
                    { cmd: 'TBT', desc: 'Total Blocking Time < 200ms' }
                ]
            },
            {
                id: 'optimization-techniques',
                title: 'Техніки оптимізації',
                code: `// Image optimization
<img 
  src="image.jpg"
  srcSet="small.jpg 300w, medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 600px) 300px, (max-width: 900px) 768px, 1200px"
  loading="lazy"
  alt="Description"
/>

// Prefetch/Preload
<link rel="prefetch" href="/next-page.js" />
<link rel="preload" href="font.woff2" as="font" crossorigin />
<link rel="dns-prefetch" href="https://api.example.com" />

// Code splitting with React
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}

// Bundle size optimization
// 1. Tree shaking - import тільки те що потрібно
import { debounce } from 'lodash-es'  // ✅
import _ from 'lodash'  // ❌

// 2. Dynamic imports
const module = await import('./module.js')

// 3. Compress images, use WebP
// 4. Minify CSS/JS
// 5. Use CDN`
            },
            {
                id: 'lighthouse',
                title: 'Lighthouse Tips',
                code: `// Performance improvements
// 1. Eliminate render-blocking resources
<link rel="preload" as="style" href="critical.css" />

// 2. Minimize main thread work
// - Use Web Workers for heavy computation
// - Break long tasks into smaller chunks

// 3. Reduce JavaScript execution time
// - Code splitting
// - Remove unused code
// - Minify and compress

// 4. Avoid enormous network payloads
// - Compress images
// - Use lazy loading
// - Implement caching

// 5. Serve images in next-gen formats
// - WebP instead of JPEG/PNG
// - AVIF for better compression

// Service Worker caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})`
            }
        ]
    }
};

// ========== ФУНКЦІЇ ==========

// ========== ФУНКЦІЇ ==========

let activeSection = 'quick-start';
let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
let searchTerm = '';

function init() {
    // 1. ПРИМУСОВО ВСТАНОВЛЮЄМО БІЛУ ТЕМУ ЯК ПОЧАТКОВУ
    const body = document.body;
    const icon = document.getElementById('theme-icon');

    // Перевіряємо, чи є збережена тема, якщо ні — ставимо light
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'light') {
        body.classList.remove('dark');
        body.classList.add('light');
        if (icon) icon.textContent = '🌙'; // Показуємо місяць, щоб можна було перемкнути на темну
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        if (icon) icon.textContent = '☀️';
    }

    renderNav();
    renderContent();

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('search-input').focus();
        }
    });
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');

    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        icon.textContent = '🌙';
        localStorage.setItem('theme', 'light'); // Зберігаємо вибір
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'dark'); // Зберігаємо вибір
    }
}

function renderNav() {
    const navTabs = document.getElementById('nav-tabs');
    navTabs.innerHTML = Object.entries(data).map(([key, section]) => `
    <button class="nav-btn ${activeSection === key ? 'active' : ''}" onclick="setActiveSection('${key}')">
      <span>${section.icon}</span>
      <span>${section.title}</span>
    </button>
  `).join('');
}

function setActiveSection(section) {
    activeSection = section;
    renderNav();
    renderContent();
}

function handleSearch() {
    searchTerm = document.getElementById('search-input').value;
    renderContent();
}

function filterContent() {
    if (!searchTerm) return data;

    const filtered = {};
    const searchLower = searchTerm.toLowerCase();

    Object.entries(data).forEach(([key, section]) => {
        const filteredItems = section.content.filter(item => {
            if (item.title?.toLowerCase().includes(searchLower)) return true;
            if (item.code?.toLowerCase().includes(searchLower)) return true;
            if (item.items?.some(i =>
                i.cmd?.toLowerCase().includes(searchLower) ||
                i.desc?.toLowerCase().includes(searchLower)
            )) return true;
            return false;
        });

        if (filteredItems.length > 0) {
            filtered[key] = { ...section, content: filteredItems };
        }
    });

    return filtered;
}

function renderContent() {
    const content = document.getElementById('content');
    const filtered = filterContent();
    const sectionData = filtered[activeSection];

    if (!sectionData) {
        content.innerHTML = `
      <div class="empty-state">
        Нічого не знайдено за запитом "${searchTerm}"
      </div>
    `;
        return;
    }

    content.innerHTML = sectionData.content.map(item => `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${item.title}</h3>
        <button class="bookmark-btn ${bookmarks.includes(item.id) ? 'active' : ''}" onclick="toggleBookmark('${item.id}')">
          ★
        </button>
      </div>

      ${item.items ? `
        <div>
          ${item.items.map((cmd, idx) => `
            <div class="item">
              <code class="item-cmd">${escapeHtml(cmd.cmd)}</code>
              <span class="item-desc">${cmd.desc}</span>
              <button class="copy-btn" onclick="copyToClipboard(\`${escapeHtml(cmd.cmd)}\`, '${item.id}-${idx}')">
                <span id="copy-${item.id}-${idx}">📋</span>
              </button>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${item.code ? `
        <div class="code-block">
          <pre class="code-pre"><code>${escapeHtml(item.code)}</code></pre>
          <button class="code-copy-btn" onclick="copyToClipboard(\`${escapeHtml(item.code)}\`, '${item.id}')">
            <span id="copy-${item.id}">📋</span>
          </button>
        </div>
      ` : ''}
    </div>
  `).join('');
}

function toggleBookmark(id) {
    if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter(b => b !== id);
    } else {
        bookmarks.push(id);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderContent();
}

function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text);
    const el = document.getElementById(`copy-${id}`);
    el.textContent = '✅';
    setTimeout(() => {
        el.textContent = '📋';
    }, 2000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize app
init();