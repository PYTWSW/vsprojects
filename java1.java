class User{
    private String name;
    private Integer age;

    void init(String name, Integer age){
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        User user = new User();
        user.init("wsw", 21);
        System.out.println(user.name + " " + user.age);
    }
}