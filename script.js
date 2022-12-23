class MyArray {
    constructor(initialSize = 1) {
        if (Number(initialSize) !== initialSize || Math.round(initialSize) !== initialSize) {
            throw new Error('Длина массива должна быть целым числом');
        }

        if (!(initialSize > 0)) {
            throw new Error('Размер массива должен быть больше нуля');
        }

        this.size = initialSize;
        this.memory = allocate(initialSize);
        this.length = 0;
    }

    // Возвращает значение по индексу.
    // Если индекс за пределами — кидает ошибку.
    get(index){
        if (index >=this.length || index < 0){
            throw new Error('Error')
        }
        return this.memory[index]
    }

    // Устанавливает значение по индексу.
    // Если индекс за пределами — кидает ошибку.
    set(index, value) {
        if (index >=this.length || index < 0){
            throw new Error('Error')
        }
        this.memory[index] = value
    }

    // Добавляет новый элемент в массив.
    // Если index не определён — добавляет в конец массива.
    // В противном случае — добавляет по индексу со сдвигом
    // всех последующих элементов.
    // Если индекс за пределами - кидает ошибку.
    // Увеличивает выделенную память вдвое, если необходимо.
    // Возвращает новую длину массива.
    add(value, index) {
        if (index === undefined) {
            this.memory[this.length] = value;
        } else {
            if (index < 0 || index >= this.length) {
                throw new Error('Error');
            }

            for (let i = this.length; i > index; i--) {
                this.memory[i] = this.memory[i - 1];
            }

            this.memory[index] = value;
        }

        this.length++;

        if (this.length === this.size) {
            const newSize = this.size * 2;
            const newMemory = allocate(newSize);

            for (let i = 0; i < this.size; i++) {
                newMemory[i] = this.memory[i];
            }

            this.size = newSize;
            this.memory = newMemory;
        }

        return this.length;
    }

    // Удаляет элемент по индексу со сдвигом всех последующих элементов.
    // Если индекс за пределами - кидает ошибку.
    // Возвращает новую длину массива.
    delete(index) {
        if (index >=this.length || index < 0){
            throw new Error('Error')
        }
        for (let i = index + 1; i < this.length; i++){
            this.memory[i-1] = this.memory[i]
        }
        this.length--;

        return this.length
    }
}

function allocate(size) {
    const memory = {};

    for (let i = 0; i < size; i++) {
        memory[i] = undefined;
    }

    return memory;
}